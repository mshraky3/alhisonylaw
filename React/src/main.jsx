import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global error handler to catch and handle errors gracefully
// This must run BEFORE any other code to catch early errors

// Store original console methods
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

// Helper function to check if error is from external scripts
function isExternalScriptError(source, message, stack) {
  const sourceStr = String(source || '')
  const messageStr = String(message || '')
  const stackStr = String(stack || '')
  
  return (
    sourceStr.includes('5b6d41c8f3d086816edf7147d0e5be66.js') ||
    sourceStr.includes('extension://') || 
    sourceStr.includes('moz-extension://') ||
    sourceStr.includes('chrome-extension://') ||
    sourceStr.match(/[a-f0-9]{32}\.js$/) ||
    messageStr.includes('cleanUpStorage') ||
    messageStr.includes('quoteCheck') ||
    messageStr.includes('Cannot read properties of null') ||
    messageStr.includes('indexOf is not a function') ||
    stackStr.includes('cleanUpStorage') ||
    stackStr.includes('quoteCheck') ||
    stackStr.includes('5b6d41c8f3d086816edf7147d0e5be66.js')
  )
}

// Override console.error to filter external script errors
// This is a backup in case the HTML script didn't catch it
const currentConsoleError = console.error
if (currentConsoleError !== originalConsoleError) {
  // HTML script already overrode it, use that one
  console.error = currentConsoleError
} else {
  // Override it here
  console.error = function(...args) {
    const errorString = args.map(arg => {
      if (arg instanceof Error) {
        return arg.message + ' ' + (arg.stack || '')
      }
      return String(arg)
    }).join(' ')
    
    // Check for specific external script error patterns
    if (isExternalScriptError('', errorString, errorString)) {
      // Silently ignore external script errors
      return
    }
    
    // Call original console.error for legitimate errors
    originalConsoleError.apply(console, args)
  }
}

// Global error event listener (must be set up early)
window.addEventListener('error', (event) => {
  const errorSource = event.filename || ''
  const errorMessage = event.message || ''
  const errorStack = event.error?.stack || ''
  
  // Check if error is from external scripts
  if (isExternalScriptError(errorSource, errorMessage, errorStack)) {
    // Prevent the error from propagating and showing in console
    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()
    return false
  }
  
  // Log application errors normally
  originalConsoleError('Application error:', event.error || event.message)
}, true) // Use capture phase to catch errors early

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const errorStack = event.reason?.stack || ''
  const errorMessage = event.reason?.message || String(event.reason)
  
  // Check if it's from external scripts
  if (isExternalScriptError('', errorMessage, errorStack)) {
    // Prevent the error from showing in console as unhandled
    event.preventDefault()
    return false
  }
  
  originalConsoleError('Unhandled promise rejection:', event.reason)
}, true) // Use capture phase

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


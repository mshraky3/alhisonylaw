import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/test')
      setResponse(res.data.message)
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return
    
    setLoading(true)
    try {
      const res = await axios.post('/api/message', { message })
      setResponse(res.data.response)
      setMessage('')
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>React + Express Test App</h1>
      
      <div className="card">
        <button onClick={testConnection} disabled={loading}>
          {loading ? 'Loading...' : 'Test Connection'}
        </button>
        
        <div className="input-group">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} disabled={loading || !message.trim()}>
            Send
          </button>
        </div>
        
        {response && (
          <div className="response">
            <strong>Response:</strong> {response}
          </div>
        )}
      </div>
    </div>
  )
}

export default App


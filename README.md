# React Vite + Express Full-Stack App

A simple full-stack application with React (Vite) frontend and Express backend, connected via axios.

## Setup

1. Install all dependencies:
```bash
npm run install:all
```

Or manually:
```bash
npm install
cd Backend && npm install
cd ../React && npm install
```

## Running the App

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React app on `http://localhost:3000`

## Project Structure

- `React/` - React Vite frontend application
- `Backend/` - Express backend server

## Features

- Test connection button to verify backend connectivity
- Send message functionality to test POST requests
- Axios configured to proxy API requests through Vite


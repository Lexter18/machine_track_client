import React from 'react'
import ReactDOM from 'react-dom/client'
import { MachinTrackApp } from './MachinTrackApp'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MachinTrackApp />
      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
)

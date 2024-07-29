import React from 'react'
import ReactDOM from 'react-dom/client'
import {MachinTrackApp} from './MachinTrackApp'
import './styles.css'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './auth/context/AuthProvider'
import {LocationsProvider} from "./context/LocationsProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <LocationsProvider>
                    <MachinTrackApp/>
                </LocationsProvider>
            </AuthProvider>
        </BrowserRouter>

    </React.StrictMode>
)

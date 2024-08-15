import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome-all.min.css';
import './assets/css/jquery-ui.min.css';
import './assets/css/perfect-scrollbar.min.css';
import './assets/css/morris.min.css';
import './assets/css/select2.min.css';
import './assets/css/jquery-jvectormap.min.css';
import './assets/css/horizontal-timeline.min.css';
import './assets/css/weather-icons.min.css';
import './assets/css/dropzone.min.css';
import './assets/css/ion.rangeSlider.min.css';
import './assets/css/ion.rangeSlider.skinFlat.min.css';
import './assets/css/datatables.min.css';
import './assets/css/fullcalendar.min.css';
import './assets/css/style.css';
//import './styles.css'

import {MachinTrackApp} from './MachinTrackApp'
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

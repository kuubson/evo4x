import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'assets/styles/index.scss'

import App from 'components/App'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()

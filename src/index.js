import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'assets/styles/index.scss'

import theme from 'assets/styles/theme'

import App from 'components/App'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()

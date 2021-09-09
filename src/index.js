import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'assets/styles/index.scss'

import App from 'components/App'

import Loader from 'components/Shared/Loader/Loader'

import theme from 'assets/styles/theme'

import { store, persistor } from 'redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
                {/* </PersistGate> */}
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register({
    onUpdate: async registration => {
        await registration.unregister()
        window.location.reload()
    }
})

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { register } from './serviceWorkerRegistration'

import { store, persistor } from 'redux/store'

import { theme } from 'assets/styles/theme'
import 'assets/styles/index.scss'

import App from 'components/App'

import Loader from 'components/shared/Loader/Loader'

render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

register({
    onUpdate: async registration => {
        await registration.unregister()
        window.location.reload()
    }
})

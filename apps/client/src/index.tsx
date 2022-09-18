import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { persistor, store } from 'redux/store'

import 'assets/styles/index.scss'
import { theme } from 'assets/styles/theme'

import App from 'components/App'
import Loader from 'components/shared/Loader/Loader'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate loading={<Loader />} persistor={persistor}>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </PersistGate>
      </Provider>
   </StrictMode>,
   document.getElementById('root')
)

serviceWorkerRegistration.register({
   onUpdate: async registration => {
      await registration.unregister()
      window.location.reload()
   },
})

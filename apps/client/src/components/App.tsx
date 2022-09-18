import axios from 'axios'
import { useEffect } from 'react'
import { unstable_HistoryRouter as HistoryRouter, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components/macro'

import Loader from 'components/shared/Loader/Loader'

import { handleApiError, setRole } from 'helpers'

import { history } from 'utils'

import { AdminAnalysisRoute, AnalysisRoute, ChatRoute, HomeRoute, ProfileRoute } from './routes'

const AppContainer = styled.main`
   height: 100%;
`

const App = () => {
   useEffect(() => {
      const checkRole = async () => {
         try {
            const url = '/api/global/auth/checkRole'
            const response = await axios.get(url)
            if (response) {
               const { role } = response.data
               setRole(role)
            }
         } catch (error) {
            handleApiError(error)
         }
      }
      checkRole()
   }, [])
   return (
      <AppContainer>
         <Loader />
         <HistoryRouter history={history}>
            <Routes>
               <Route path="/" element={<HomeRoute />} />
               <Route path="/users/:id" element={<ProfileRoute />} />
               <Route path="/user/profile" element={<ProfileRoute />} />
               <Route path="/user/chat" element={<ChatRoute />} />
               <Route path="/user/analysis" element={<AnalysisRoute />} />
               <Route path="/admin/analysis" element={<AdminAnalysisRoute />} />
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </HistoryRouter>
      </AppContainer>
   )
}

export default App

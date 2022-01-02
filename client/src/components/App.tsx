import { useEffect } from 'react'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import axios from 'axios'

import { Guest, User, Admin } from 'components/shared/roles'
import Loader from 'components/shared/Loader/Loader'

import Home from 'components/guest/Home/Home'
import Profile from 'components/user/Profile/Profile'
// import Chat from 'components/User/Chat/Chat'
// import Analysis from 'components/User/Analysis/Analysis'
import AdminAnalysis from 'components/admin/Analysis/Analysis'

import { setRole, handleApiError } from 'helpers'

import { history } from 'utils'

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
    const routes = [
        {
            id: 1,
            path: '/',
            element: (
                <Guest>
                    <Home />
                </Guest>
            )
        },
        {
            id: 2,
            path: '/user/profile',
            element: (
                <User>
                    <Profile />
                </User>
            )
        },
        // {
        //     id: 3,
        //     path: '/users/:id',
        //     element: () => (
        //         <User>
        //             <Profile />
        //         </User>
        //     )
        // },
        // {
        //     id: 4,
        //     path: '/user/chat',
        //     element: () => (
        //         <User chat>
        //             <Chat />
        //         </User>
        //     )
        // },
        // {
        //     id: 5,
        //     path: '/user/analysis',
        //     element: () => (
        //         <User>
        //             <Analysis />
        //         </User>
        //     )
        // },
        {
            id: 6,
            path: '/admin/analysis',
            element: () => (
                <Admin>
                    <AdminAnalysis />
                </Admin>
            )
        },
        {
            id: 7,
            path: '*',
            element: <Navigate to="/" />
        }
    ]
    return (
        <AppContainer>
            <Loader />
            <HistoryRouter history={history}>
                <Routes>
                    {routes.map(({ id, path, element }) => (
                        <Route key={id} path={path} element={element} />
                    ))}
                </Routes>
            </HistoryRouter>
        </AppContainer>
    )
}

export default App

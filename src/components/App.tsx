import { useEffect } from 'react'
import styled from 'styled-components/macro'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import { Guest, Admin, User } from 'components/Shared/Roles'
import Loader from 'components/Shared/Loader/Loader'

import AdminAnalysis from 'components/Admin/Analysis/Analysis'
import Home from 'components/Guest/Home/Home'
import Profile from 'components/User/Profile/Profile'
import Chat from 'components/User/Chat/Chat'
import Analysis from 'components/User/Analysis/Analysis'

import utils from 'utils'

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
                    utils.setRole(role)
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        checkRole()
    }, [])
    const routes = [
        {
            id: 1,
            pathname: '/',
            render: () => (
                <Guest>
                    <Home />
                </Guest>
            )
        },
        {
            id: 2,
            pathname: '/user/profile',
            render: () => (
                <User>
                    <Profile />
                </User>
            )
        },
        {
            id: 3,
            pathname: '/users/:id',
            render: () => (
                <User>
                    <Profile />
                </User>
            )
        },
        {
            id: 4,
            pathname: '/user/chat',
            render: () => (
                <User chat>
                    <Chat />
                </User>
            )
        },
        {
            id: 5,
            pathname: '/user/analysis',
            render: () => (
                <User>
                    <Analysis />
                </User>
            )
        },
        {
            id: 6,
            pathname: '/admin/analysis',
            render: () => (
                <Admin>
                    <AdminAnalysis />
                </Admin>
            )
        },
        {
            id: 99,
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    return (
        <AppContainer>
            <Loader />
            <Switch>
                {routes.map(({ id, pathname, render }) => (
                    <Route key={id} path={pathname} render={render} exact />
                ))}
            </Switch>
        </AppContainer>
    )
}

export default App

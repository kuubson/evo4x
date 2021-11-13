import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import { Guest, User } from 'components/Shared/Roles'
import Loader from 'components/Shared/Loader/Loader'

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
                const url = '/api/global/checkRole'
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
            pathname: '/user/chat',
            render: () => (
                <User chat>
                    <Chat />
                </User>
            )
        },
        {
            id: 4,
            pathname: '/user/analysis',
            render: () => (
                <User>
                    <Analysis />
                </User>
            )
        },
        {
            id: 11,
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

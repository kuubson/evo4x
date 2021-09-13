import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import { Guest, User } from 'components/Shared/Roles'
import Loader from 'components/Shared/Loader/Loader'

import Home from 'components/Guest/Home/Home'

import Profile from 'components/User/Profile/Profile'

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
            path: '/:token?',
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
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    return (
        <AppContainer>
            <Loader />
            <Switch>
                {routes.map(({ id, path, render }) => (
                    <Route key={id} path={path} render={render} exact />
                ))}
            </Switch>
        </AppContainer>
    )
}

export default App

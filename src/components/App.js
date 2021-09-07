import React from 'react'
import styled from 'styled-components/macro'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from 'components/Guest/Home/Home'

const AppContainer = styled.main`
    height: 100%;
`

const App = () => {
    const routes = [
        {
            id: 1,
            path: '/',
            render: () => <Home />
        },
        {
            id: 2,
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    return (
        <AppContainer>
            <Switch>
                {routes.map(({ id, path, render }) => (
                    <Route key={id} path={path} render={render} exact />
                ))}
            </Switch>
        </AppContainer>
    )
}

export default App

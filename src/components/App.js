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
            path: '/',
            render: () => <Home />
        },
        {
            pathname: '*',
            render: () => <Redirect to="/" />
        }
    ]
    return (
        <AppContainer>
            <Switch>
                {routes.map(({ path, render }) => (
                    <Route path={path} render={render} exact />
                ))}
            </Switch>
        </AppContainer>
    )
}

export default App

import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import utils from 'utils'

const UserContainer = styled.section`
    height: 100%;
`

const User = ({ children }) => {
    const { role } = hooks.useRole()
    useEffect(() => {
        if (role !== 'user') {
            utils.history.push('/?failedAuthentication=true')
        }
    }, [])
    const logout = async () => {
        const url = '/api/global/logout'
        const response = await utils.axios.get(url)
        if (response) {
            utils.setRole('guest')
            utils.history.push('/')
        }
    }
    return role === 'user' ? (
        <UserContainer>
            <Navbar
                links={[
                    {
                        link: 'Profile',
                        pathname: '/user/profile'
                    },
                    {
                        link: 'Analysis',
                        pathname: '/user/analysis'
                    },
                    {
                        link: 'Chat',
                        pathname: '/user/chat'
                    },
                    {
                        link: 'Sessions',
                        pathname: '/user/sessions'
                    },
                    {
                        link: 'Events',
                        pathname: '/user/events'
                    },
                    {
                        link: 'Indicators',
                        pathname: '/user/indicators'
                    },
                    {
                        link: 'Mottos',
                        pathname: '/user/mottos'
                    },
                    {
                        link: 'Aha-moments',
                        pathname: '/user/aha-moments'
                    },
                    {
                        link: 'Mentors',
                        pathname: '/user/mentors'
                    },
                    {
                        link: 'Logout',
                        onClick: logout
                    }
                ]}
            />
            {children}
        </UserContainer>
    ) : null
}

export default User

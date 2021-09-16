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
                    }
                ]}
            />
            {children}
        </UserContainer>
    ) : null
}

export default User

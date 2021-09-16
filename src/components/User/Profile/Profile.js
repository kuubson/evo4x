import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import utils from 'utils'

const ProfileContainer = styled.section`
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
    useEffect(() => {
        const getProfile = async () => {
            const url = '/api/user/getProfile'
            await utils.axios.get(url)
        }
        getProfile()
    }, [])
    return <ProfileContainer>User Profile</ProfileContainer>
}

export default Profile

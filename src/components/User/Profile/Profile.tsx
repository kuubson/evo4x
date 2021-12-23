import { useState } from 'react'

import styled from 'styled-components/macro'

import profileHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import ChatDashboard from 'components/User/Chat/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

const ProfileContainer = styled.section`
    min-height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
    const [showAvatarInput, setShowAvatarInput] = useState(true)
    const {
        profile: { name, nameError, story, storyError },
        profileHandler,
        avatar,
        withDefaultAvatar,
        updateProfile,
        changeAvatar,
        removeAvatar
    } = profileHooks.useProfile({
        setShowAvatarInput
    })
    return (
        <ProfileContainer>
            <Dashboard.Content>
                <Dashboard.Info onSubmit={updateProfile}>
                    <RegistrationModalComposed.Input
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Type your name"
                        error={nameError}
                        onChange={profileHandler.handleInputValue}
                    />
                    <RegistrationModalComposed.Input
                        id="story"
                        name="story"
                        type="textarea"
                        label="About your trading"
                        value={story}
                        placeholder="Type the story of your trading"
                        error={storyError}
                        onChange={profileHandler.handleInputValue}
                    />
                    <Dashboard.Button>Update profile</Dashboard.Button>
                    <ApiFeedback />
                </Dashboard.Info>
                <Dashboard.AvatarContainer>
                    <Dashboard.Avatar src={avatar} />
                    <Dashboard.Buttons>
                        <Dashboard.Button as="label" htmlFor="file">
                            Change avatar
                        </Dashboard.Button>
                        {!withDefaultAvatar && (
                            <Dashboard.Button onClick={removeAvatar}>
                                Remove avatar
                            </Dashboard.Button>
                        )}
                    </Dashboard.Buttons>
                    {showAvatarInput && <ChatDashboard.FileInput onChange={changeAvatar} />}
                </Dashboard.AvatarContainer>
            </Dashboard.Content>
        </ProfileContainer>
    )
}

export default Profile

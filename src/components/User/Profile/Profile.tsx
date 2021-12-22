import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import ChatDashboard from 'components/User/Chat/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import profileHelpers from './helpers'

const ProfileContainer = styled.section`
    min-height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
    const [form, setForm] = useState({
        name: '',
        nameError: '',
        story: '',
        storyError: ''
    })
    const formHandler = hooks.useFormHandler(setForm)
    const { name, nameError, story, storyError } = form
    const [avatar, setAvatar] = useState('')
    const [showAvatarInput, setShowAvatarInput] = useState(true)
    useEffect(() => {
        profileHelpers.getProfile({
            setForm,
            setAvatar
        })
    }, [])
    const withDefaultAvatar = avatar.includes('ui-avatars')
    return (
        <ProfileContainer>
            <Dashboard.Content>
                <Dashboard.Info
                    onSubmit={event =>
                        profileHelpers.updateProfile({
                            event,
                            form,
                            avatar,
                            withDefaultAvatar,
                            setForm,
                            setAvatar,
                            formHandler
                        })
                    }
                >
                    <RegistrationModalComposed.Input
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Type your name"
                        error={nameError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RegistrationModalComposed.Input
                        id="story"
                        name="story"
                        type="textarea"
                        label="About your trading"
                        value={story}
                        placeholder="Type the story of your trading"
                        error={storyError}
                        onChange={formHandler.handleInputValue}
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
                            <Dashboard.Button
                                onClick={() =>
                                    profileHelpers.removeAvatar({
                                        setAvatar
                                    })
                                }
                            >
                                Remove avatar
                            </Dashboard.Button>
                        )}
                    </Dashboard.Buttons>
                    {showAvatarInput && (
                        <ChatDashboard.FileInput
                            onChange={event =>
                                profileHelpers.changeAvatar({
                                    event,
                                    setAvatar,
                                    setShowAvatarInput
                                })
                            }
                        />
                    )}
                </Dashboard.AvatarContainer>
            </Dashboard.Content>
        </ProfileContainer>
    )
}

export default Profile

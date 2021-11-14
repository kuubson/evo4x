import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import Dashboard from './styled/Dashboard'

import RMComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

const ProfileContainer = styled.section`
    min-height: 100%;
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
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        const getProfile = async () => {
            const url = '/api/user/getProfile'
            const response = await utils.axios.get(url)
            if (response) {
                const { name, story, avatar } = response.data
                setForm(form => ({
                    ...form,
                    name,
                    story
                }))
                setAvatar(avatar)
            }
        }
        getProfile()
    }, [])
    const { name, nameError, story, storyError } = form
    const formHandler = hooks.useFormHandler(setForm)
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            nameError: '',
            storyError: ''
        }))
        if (!formHandler.validateProperty('name', name)) validated = false
        return validated
    }
    const withDefaultAvatar = avatar.includes('ui-avatars')
    const updateProfile = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/updateProfile'
                const updatedAvatar = withDefaultAvatar
                    ? `https://eu.ui-avatars.com/api/?name=${name.charAt(0)}`
                    : avatar
                await utils.axios.post(url, {
                    name,
                    story,
                    avatar: updatedAvatar
                })
                setAvatar(updatedAvatar)
                setTimeout(() => {
                    utils.setApiFeedback('')
                }, 1500)
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    return (
        <ProfileContainer>
            <Dashboard.Content>
                <Dashboard.Info onSubmit={updateProfile}>
                    <RMComposed.Input
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Type your name"
                        error={nameError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RMComposed.Input
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
                    {avatar && <Dashboard.Avatar src={avatar} />}
                    <Dashboard.Buttons>
                        <Dashboard.Button>Change photo</Dashboard.Button>
                        {!withDefaultAvatar && <Dashboard.Button>Remove photo</Dashboard.Button>}
                    </Dashboard.Buttons>
                </Dashboard.AvatarContainer>
            </Dashboard.Content>
        </ProfileContainer>
    )
}

export default Profile

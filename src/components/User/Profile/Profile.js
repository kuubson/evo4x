import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import CDashboard from 'components/User/Chat/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import RMComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

const ProfileContainer = styled.section`
    min-height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
    const [showAvatarInput, setShowAvatarInput] = useState(true)
    const [form, setForm] = useState({
        name: '',
        nameError: '',
        story: '',
        storyError: ''
    })
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        const getProfile = async () => {
            const url = '/api/user/profile/getProfile'
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
                const url = '/api/user/profile/updateProfile'
                const updatedAvatar = withDefaultAvatar ? utils.defaultAvatar(name) : avatar
                await utils.axios.post(url, {
                    name,
                    story,
                    avatar: updatedAvatar
                })
                setAvatar(updatedAvatar)
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    const changeAvatar = async e => {
        const file = e.target.files[0]
        if (file) {
            const path = e.target.value
            const { name, size } = file
            const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
            const isImage = imageExtensions.test(path) || imageExtensions.test(name)
            const resetFileInput = () => {
                setShowAvatarInput(false)
                setShowAvatarInput(true)
            }
            if (!isImage) {
                resetFileInput()
                return utils.setApiFeedback('You cannot upload this file as an avatar')
            }
            if (isImage) {
                if (size > 31457280) {
                    resetFileInput() // 30MB
                    return utils.setApiFeedback('You cannot upload this large file')
                }
            }
            const form = new FormData()
            form.append('file', file)
            try {
                const url = '/api/user/profile/changeAvatar'
                const response = await utils.axios.post(url, form)
                if (response) {
                    const { avatar } = response.data
                    setAvatar(avatar)
                    resetFileInput()
                }
            } catch (error) {
                resetFileInput()
            }
        }
    }
    const removeAvatar = async () => {
        const url = '/api/user/profile/removeAvatar'
        const response = await utils.axios.get(url)
        if (response) {
            const { avatar } = response.data
            setAvatar(avatar)
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
                        <Dashboard.Button as="label" htmlFor="file">
                            Change avatar
                        </Dashboard.Button>
                        {!withDefaultAvatar && (
                            <Dashboard.Button onClick={removeAvatar}>
                                Remove avatar
                            </Dashboard.Button>
                        )}
                    </Dashboard.Buttons>
                    {showAvatarInput && <CDashboard.FileInput onChange={changeAvatar} />}
                </Dashboard.AvatarContainer>
            </Dashboard.Content>
        </ProfileContainer>
    )
}

export default Profile

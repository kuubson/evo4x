import { useEffect, useState } from 'react'

import { useFormHandler } from 'hooks'

import { setApiFeedback, handleApiValidation, getDefaultAvatar } from 'helpers'
import { updateCachedAvatar } from '../helpers'

import { axios, filesInfo } from 'utils'

type ProfileHook = {
    setShowAvatarInput: ReactDispatch<boolean>
}

type ChangeAvatarResponse = {
    avatar: string
}

export const useProfile = ({ setShowAvatarInput }: ProfileHook) => {
    const [profile, setProfile] = useState({
        name: '',
        nameError: '',
        story: '',
        storyError: ''
    })
    const profileHandler = useFormHandler(setProfile)
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        const getProfile = async () => {
            const loadCachedProfile = () => {
                const profile = JSON.parse(sessionStorage.getItem('profile')!)
                if (profile) {
                    const { name, story, avatar } = profile
                    setProfile(profile => ({
                        ...profile,
                        name,
                        story
                    }))
                    setAvatar(avatar)
                }
            }
            try {
                loadCachedProfile()
                const url = '/api/user/profile/getProfile'
                const response = await axios.get(url)
                if (response) {
                    const { name, story, avatar } = response.data
                    const profile = {
                        name,
                        story,
                        avatar
                    }
                    sessionStorage.setItem('profile', JSON.stringify(profile))
                    setProfile(profile => ({
                        ...profile,
                        name,
                        story
                    }))
                    setAvatar(avatar)
                }
            } catch (error) {
                setAvatar(getDefaultAvatar(''))
            }
        }
        getProfile()
    }, [])
    const withDefaultAvatar = avatar.includes('ui-avatars')
    const validateProfile = () => {
        let validated = true
        setProfile(profile => ({
            ...profile,
            nameError: '',
            storyError: ''
        }))
        const { name } = profile
        if (!profileHandler.validateProperty('name', name)) validated = false
        return validated
    }
    const updateProfile = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validateProfile()) {
            try {
                const url = '/api/user/profile/updateProfile'
                const { name, story } = profile
                const updatedAvatar = withDefaultAvatar ? getDefaultAvatar(name) : avatar
                await axios.post(url, {
                    name,
                    story,
                    avatar: updatedAvatar
                })
                setAvatar(updatedAvatar)
                const updateCachedProfile = () => {
                    const updatedProfile = {
                        name,
                        story,
                        avatar: updatedAvatar
                    }
                    sessionStorage.setItem('profile', JSON.stringify(updatedProfile))
                }
                updateCachedProfile()
            } catch (error) {
                handleApiValidation(error, setProfile)
            }
        }
    }
    const changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files![0]
        if (file) {
            const { regex, sizes } = filesInfo
            const { name, size } = file
            const isImage = regex.images.test(name)
            const resetAvatarFileInput = () => {
                setShowAvatarInput(false)
                setShowAvatarInput(true)
            }
            if (!isImage) {
                resetAvatarFileInput()
                return setApiFeedback('You cannot upload this file as an avatar')
            }
            if (isImage) {
                if (size > sizes.imageMaxSize) {
                    resetAvatarFileInput()
                    return setApiFeedback('You cannot upload this large file')
                }
            }
            const form = new FormData()
            form.append('file', file)
            try {
                const url = '/api/user/profile/changeAvatar'
                const response = await axios.post<ChangeAvatarResponse>(url, form)
                if (response) {
                    const { avatar } = response.data
                    setAvatar(avatar)
                    updateCachedAvatar(avatar)
                    resetAvatarFileInput()
                }
            } catch (error) {
                resetAvatarFileInput()
            }
        }
    }
    const removeAvatar = async () => {
        const url = '/api/user/profile/removeAvatar'
        const response = await axios.get(url)
        if (response) {
            const { avatar } = response.data
            setAvatar(avatar)
            updateCachedAvatar(avatar)
        }
    }
    return {
        profile,
        profileHandler,
        avatar,
        withDefaultAvatar,
        updateProfile,
        changeAvatar,
        removeAvatar
    }
}

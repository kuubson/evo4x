import { useEffect, useState } from 'react'

import hooks from 'hooks'

import profileHelpers from '../helpers'

type ProfileHook = {
    setShowAvatarInput: DispatchBoolean
}

const useProfile = ({ setShowAvatarInput }: ProfileHook) => {
    const [profile, setProfile] = useState({
        name: '',
        nameError: '',
        story: '',
        storyError: ''
    })
    const profileHandler = hooks.useFormHandler(setProfile)
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        profileHelpers.getProfile({
            setProfile,
            setAvatar
        })
    }, [])
    const withDefaultAvatar = avatar.includes('ui-avatars')
    const updateProfile = (event: React.FormEvent) => {
        profileHelpers.updateProfile({
            event,
            profile,
            avatar,
            withDefaultAvatar,
            setProfile,
            setAvatar,
            profileHandler
        })
    }
    const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        profileHelpers.changeAvatar({
            event,
            setAvatar,
            setShowAvatarInput
        })
    }
    const removeAvatar = () => {
        profileHelpers.removeAvatar({
            setAvatar
        })
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

export default useProfile

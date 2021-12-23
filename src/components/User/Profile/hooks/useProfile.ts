import { useEffect, useState } from 'react'

import hooks from 'hooks'

import profileHelpers from 'components/User/Profile/helpers'

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
    const [avatar, setAvatar] = useState('')
    const profileHandler = hooks.useFormHandler(setProfile)
    useEffect(() => {
        profileHelpers.getProfile({
            setProfile,
            setAvatar
        })
    }, [])
    const withDefaultAvatar = avatar.includes('ui-avatars')
    const updateProfile = (event: React.FormEvent) =>
        profileHelpers.updateProfile({
            event,
            profile,
            avatar,
            withDefaultAvatar,
            setProfile,
            setAvatar,
            profileHandler
        })
    const removeAvatar = () =>
        profileHelpers.removeAvatar({
            setAvatar
        })
    const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) =>
        profileHelpers.changeAvatar({
            event,
            setAvatar,
            setShowAvatarInput
        })
    return {
        profile,
        profileHandler,
        avatar,
        updateProfile,
        removeAvatar,
        changeAvatar,
        withDefaultAvatar
    }
}

export default useProfile

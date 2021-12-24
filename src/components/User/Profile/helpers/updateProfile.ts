import utils from 'utils'

import profileHelpers from '.'

type ProfileUpdater = {
    event: React.FormEvent
    profile: ProfileForm
    profileHandler: any
    avatar: string
    withDefaultAvatar: boolean
    setProfile: React.Dispatch<React.SetStateAction<ProfileForm>>
    setAvatar: DispatchString
}

const updateProfile = async ({
    event,
    profile,
    profileHandler,
    avatar,
    withDefaultAvatar,
    setProfile,
    setAvatar
}: ProfileUpdater) => {
    event.preventDefault()
    if (
        profileHelpers.validateProfile({
            profile,
            setProfile,
            profileHandler
        })
    ) {
        try {
            const url = '/api/user/profile/updateProfile'
            const { name, story } = profile
            const updatedAvatar = withDefaultAvatar ? utils.defaultAvatar(name) : avatar
            await utils.axios.post(url, {
                name,
                story,
                avatar: updatedAvatar
            })
            setAvatar(updatedAvatar)
        } catch (error) {
            utils.handleApiValidation(error, setProfile)
        }
    }
}

export default updateProfile

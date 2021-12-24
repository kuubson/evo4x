import utils from 'utils'

type ProfileGetter = {
    setProfile: React.Dispatch<React.SetStateAction<ProfileForm>>
    setAvatar: DispatchString
}

const getProfile = async ({ setProfile, setAvatar }: ProfileGetter) => {
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
        const response = await utils.axios.get(url)
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
        setAvatar(utils.defaultAvatar(''))
    }
}

export default getProfile

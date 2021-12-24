import profileHelpers from '.'

const updateCachedAvatar = (avatar: string) => {
    const profile = JSON.parse(sessionStorage.getItem('profile')!)
    const updatedProfile = {
        ...profile,
        avatar
    }
    profileHelpers.updateCachedProfile(updatedProfile)
}
export default updateCachedAvatar

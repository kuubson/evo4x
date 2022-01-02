export const updateCachedAvatar = (avatar: string) => {
    const profile = JSON.parse(sessionStorage.getItem('profile')!)
    const updatedProfile = {
        ...profile,
        avatar
    }
    sessionStorage.setItem('profile', JSON.stringify(updatedProfile))
}

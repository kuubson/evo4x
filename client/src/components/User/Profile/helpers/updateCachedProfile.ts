const updateCachedProfile = (profile: Profile) => {
    sessionStorage.setItem('profile', JSON.stringify(profile))
}

export default updateCachedProfile

type ProfileValidator = {
    profile: ProfileForm
    setProfile: React.Dispatch<React.SetStateAction<ProfileForm>>
    profileHandler: any
}

const validateProfile = ({ profile, setProfile, profileHandler }: ProfileValidator) => {
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

export default validateProfile

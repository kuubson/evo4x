import utils from 'utils'

export type Form = {
    name: string
    nameError: string
    story: string
    storyError: string
}

type ProfileGetter = {
    setForm: React.Dispatch<React.SetStateAction<Form>>
    setAvatar: DispatchString
}

const getProfile = async ({ setForm, setAvatar }: ProfileGetter) => {
    try {
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
    } catch (error) {
        setAvatar(utils.defaultAvatar(''))
    }
}

export default getProfile

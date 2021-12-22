import utils from 'utils'

import profileHelpers from '.'

import { Form } from './getProfile'

type ProfileUpdater = {
    event: React.FormEvent
    form: Form
    avatar: string
    withDefaultAvatar: boolean
    setForm: React.Dispatch<React.SetStateAction<Form>>
    setAvatar: DispatchString
    formHandler: any
}

const updateProfile = async ({
    event,
    form,
    avatar,
    withDefaultAvatar,
    setForm,
    setAvatar,
    formHandler
}: ProfileUpdater) => {
    event.preventDefault()
    if (
        profileHelpers.validateProfile({
            form,
            setForm,
            formHandler
        })
    ) {
        try {
            const url = '/api/user/profile/updateProfile'
            const { name, story } = form
            const updatedAvatar = withDefaultAvatar ? utils.defaultAvatar(name) : avatar
            await utils.axios.post(url, {
                name,
                story,
                avatar: updatedAvatar
            })
            setAvatar(updatedAvatar)
        } catch (error) {
            utils.handleApiValidation(error, setForm)
        }
    }
}

export default updateProfile

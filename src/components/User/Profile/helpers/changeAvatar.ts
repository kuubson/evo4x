import utils from 'utils'

import profileHelpers from '.'

type AvatarChanger = {
    event: React.ChangeEvent<HTMLInputElement>
    setAvatar: DispatchString
    setShowAvatarInput: DispatchBoolean
}

type Response = {
    avatar: string
}

const changeAvatar = async ({ event, setAvatar, setShowAvatarInput }: AvatarChanger) => {
    const file = event.currentTarget.files![0]
    if (file) {
        const { regex, sizes } = utils.filesInfo
        const { name, size } = file
        const isImage = regex.images.test(name)
        const resetFileInput = () => {
            setShowAvatarInput(false)
            setShowAvatarInput(true)
        }
        if (!isImage) {
            resetFileInput()
            return utils.setApiFeedback('You cannot upload this file as an avatar')
        }
        if (isImage) {
            if (size > sizes.imageMaxSize) {
                resetFileInput()
                return utils.setApiFeedback('You cannot upload this large file')
            }
        }
        const form = new FormData()
        form.append('file', file)
        try {
            const url = '/api/user/profile/changeAvatar'
            const response = await utils.axios.post<Response>(url, form)
            if (response) {
                const { avatar } = response.data
                profileHelpers.updateCachedAvatar(avatar)
                setAvatar(avatar)
                resetFileInput()
            }
        } catch (error) {
            resetFileInput()
        }
    }
}

export default changeAvatar

import utils from 'utils'

type AvatarChanger = {
    event: React.ChangeEvent<HTMLInputElement>
    setAvatar: DispatchString
    setShowAvatarInput: DispatchBoolean
}

const changeAvatar = async ({ event, setAvatar, setShowAvatarInput }: AvatarChanger) => {
    const file = event.currentTarget.files![0]
    if (file) {
        const path = event.target.value
        const { name, size } = file
        const { regex, sizes } = utils.filesInfo
        const isImage = regex.images.test(path) || regex.images.test(name)
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
            const response = await utils.axios.post(url, form)
            if (response) {
                const { avatar } = response.data
                setAvatar(avatar)
                resetFileInput()
            }
        } catch (error) {
            resetFileInput()
        }
    }
}

export default changeAvatar
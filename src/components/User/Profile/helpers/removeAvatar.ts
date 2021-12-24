import utils from 'utils'

import profileHelpers from '.'

type AvatarRemover = {
    setAvatar: DispatchString
}

const removeAvatar = async ({ setAvatar }: AvatarRemover) => {
    const url = '/api/user/profile/removeAvatar'
    const response = await utils.axios.get(url)
    if (response) {
        const { avatar } = response.data
        profileHelpers.updateCachedAvatar(avatar)
        setAvatar(avatar)
    }
}

export default removeAvatar

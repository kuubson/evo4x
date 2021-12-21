import utils from 'utils'

const checkRole = (role: Role) => {
    if (role === 'admin') {
        utils.history.push('/admin/profile')
    }
    if (role === 'user') {
        utils.history.push('/user/profile')
    }
}

export default checkRole

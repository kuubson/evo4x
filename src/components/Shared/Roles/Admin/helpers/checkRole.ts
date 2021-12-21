import utils from 'utils'

const checkRole = (role: Role) => {
    if (role !== 'admin') {
        utils.history.push('/')
    }
}

export default checkRole

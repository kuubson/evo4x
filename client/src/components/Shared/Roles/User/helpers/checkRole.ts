import utils from 'utils'

const checkRole = (role: Role) => {
    if (role !== 'user') {
        utils.history.push('/?failedAuthentication=true')
    }
}

export default checkRole

import { store } from 'redux/store'

import { setRole as setRoleAction } from 'redux/reducers/role'

export const setRole = (role: AllRoles) => store.dispatch(setRoleAction(role))

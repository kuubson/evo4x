import { useSocket } from 'hooks'

import { logout } from 'helpers'

export const useAdmin = () => {
    const { clearSocket } = useSocket()
    const links = [
        {
            link: 'Analysis',
            pathname: '/admin/analysis'
        },
        {
            link: 'Logout',
            onClick: () => logout(clearSocket)
        }
    ]
    return {
        links
    }
}

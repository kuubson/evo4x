import userHelpers from 'components/Shared/Roles/User/helpers'

const links = (clearSocket: () => void) => [
    {
        link: 'Analysis',
        pathname: '/admin/analysis'
    },
    {
        link: 'Logout',
        onClick: () => userHelpers.logout(clearSocket)
    }
]

export default links

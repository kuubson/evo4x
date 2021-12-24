import userHelpers from '../helpers'

const links = (unreadMessagesAmount: number, clearSocket: () => void) => [
    {
        link: 'Profile',
        pathname: '/user/profile'
    },
    {
        link: 'Analysis',
        pathname: '/user/analysis'
    },
    {
        link: 'Chat',
        pathname: '/user/chat',
        counter: unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99
    },
    {
        link: 'Sessions',
        pathname: '/user/sessions'
    },
    {
        link: 'Events',
        pathname: '/user/events'
    },
    {
        link: 'Indicators',
        pathname: '/user/indicators'
    },
    {
        link: 'Mottos',
        pathname: '/user/mottos'
    },
    {
        link: 'Aha-moments',
        pathname: '/user/aha-moments'
    },
    {
        link: 'Mentors',
        pathname: '/user/mentors'
    },
    {
        link: 'Logout',
        onClick: () => userHelpers.logout(clearSocket)
    }
]

export default links

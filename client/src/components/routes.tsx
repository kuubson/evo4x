import { Guest, User, Admin } from 'components/shared/roles'

import Home from 'components/guest/Home/Home'
import Profile from 'components/user/Profile/Profile'
import Chat from 'components/user/Chat/Chat'
import Analysis from 'components/user/Analysis/Analysis'
import AdminAnalysis from 'components/admin/Analysis/Analysis'

export const HomeRoute = () => (
    <Guest>
        <Home />
    </Guest>
)

export const ProfileRoute = () => (
    <User>
        <Profile />
    </User>
)

export const ChatRoute = () => (
    <User chat>
        <Chat />
    </User>
)

export const AnalysisRoute = () => (
    <User>
        <Analysis />
    </User>
)

export const AdminAnalysisRoute = () => (
    <Admin>
        <AdminAnalysis />
    </Admin>
)

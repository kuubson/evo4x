import AdminAnalysis from 'components/admin/Analysis/Analysis'
import Home from 'components/guest/Home/Home'
import { Admin, Guest, User } from 'components/shared/roles'
import Analysis from 'components/user/Analysis/Analysis'
import Chat from 'components/user/Chat/Chat'
import Profile from 'components/user/Profile/Profile'

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

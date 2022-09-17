import { useSocket } from 'hooks'

import { logout } from 'helpers'

export const useAdmin = () => {
   const { closeSocketConnection } = useSocket()
   const links = [
      {
         link: 'Analysis',
         pathname: '/admin/analysis',
      },
      {
         link: 'Logout',
         onClick: () => logout(closeSocketConnection),
      },
   ]
   return { links }
}

import { useEffect, useState } from 'react'

import { useQueryParams } from 'hooks'

import { handleDispatcher } from 'helpers'

import { axios } from 'utils'

export const useHome = () => {
   const { emailToken } = useQueryParams()
   const [role, setRole] = useState<UserRoles>('user')
   const [showHelpSidebar, setShowHelpSidebar] = useState(false)
   const [showRegistrationModal, setShowRegistrationModal] = useState(false)
   const [showLoginModal, setShowLoginModal] = useState(false)
   useEffect(() => {
      const authenticateEmail = async () => {
         setShowLoginModal(true)
         const url = '/api/user/auth/authenticateEmail'
         await axios.post(url, { emailToken })
      }
      if (emailToken) {
         authenticateEmail()
      }
   }, [emailToken])
   const links = [
      { link: 'Indicators' },
      {
         link: 'Login',
         onClick: () => handleDispatcher(setShowLoginModal),
      },
      {
         link: 'Help',
         onClick: () => handleDispatcher(setShowHelpSidebar),
      },
   ]
   return {
      role,
      setRole,
      showHelpSidebar,
      setShowHelpSidebar,
      showRegistrationModal,
      setShowRegistrationModal,
      showLoginModal,
      setShowLoginModal,
      links,
   }
}

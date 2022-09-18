import React, { useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components/macro'

import Navbar from 'components/shared/Navbar/Navbar'

import { useRole, useSocket } from 'hooks'

import { useUser } from './hooks'

import { history } from 'utils'

const UserContainer = styled.section`
   height: 100%;
   padding-top: 80px;
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      padding-top: 65px;
   }
`

type UserProps = ReactChildrenProps & {
   chat?: boolean
}

export const User = ({ children, chat }: UserProps) => {
   const { socket, setSocket } = useSocket()
   const { role } = useRole()
   const { links } = useUser(chat)
   useEffect(() => {
      if (!socket) {
         setSocket(io('/user'))
      }
      if (role !== 'user') {
         history.push('/?failedAuthentication=true')
      }
   }, [])
   return role === 'user' ? (
      <UserContainer>
         <Navbar links={links} hamburger />
         {children}
      </UserContainer>
   ) : null
}

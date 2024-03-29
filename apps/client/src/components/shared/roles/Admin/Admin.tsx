import React, { useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components/macro'

import Navbar from 'components/shared/Navbar/Navbar'

import { useRole, useSocket } from 'hooks'

import { useAdmin } from './hooks'

import { history } from 'utils'

const AdminContainer = styled.section`
   height: 100%;
   padding-top: 80px;
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      padding-top: 65px;
   }
`

export const Admin = ({ children }: ReactChildrenProps) => {
   const { socket, setSocket } = useSocket()
   const { role } = useRole()
   const { links } = useAdmin()
   useEffect(() => {
      if (!socket) {
         setSocket(io('/admin'))
      }
      if (role !== 'admin') {
         history.push('/')
      }
   }, [])
   return role === 'admin' ? (
      <AdminContainer>
         <Navbar links={links} hamburger />
         {children}
      </AdminContainer>
   ) : null
}

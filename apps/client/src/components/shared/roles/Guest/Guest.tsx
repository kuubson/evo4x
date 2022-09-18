import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import { useRole, useSocket } from 'hooks'

import { setRole } from 'helpers'

import { history } from 'utils'

const GuestContainer = styled.section`
   height: 100%;
`

export const Guest = ({ children }: ReactChildrenProps) => {
   const { closeSocketConnection } = useSocket()
   const { role } = useRole()
   useEffect(() => {
      switch (true) {
         case role === 'admin':
            history.push('/admin/profile')
            break
         case role === 'user':
            history.push('/user/profile')
            break
         default:
            closeSocketConnection()
            sessionStorage.clear()
            setRole('guest')
      }
   }, [])
   return <GuestContainer>{children}</GuestContainer>
}

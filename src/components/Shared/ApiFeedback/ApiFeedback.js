import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import sharedStyled from 'components/Shared/styled'

const ApiFeedbackContainer = styled(sharedStyled.Button)`
    max-width: 85%;
    margin: 40px auto 0px auto;
    padding: 10px;
    border-radius: 0px;
    cursor: initial;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        max-width: 100%;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        font-size: 11px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 10px;
    }
`

const ApiFeedback = () => {
    const { apiFeedback } = hooks.useApiFeedback()
    return apiFeedback ? <ApiFeedbackContainer as="p">{apiFeedback}</ApiFeedbackContainer> : null
}

export default ApiFeedback

import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

const ApiFeedbackContainer = styled.p`
    max-width: 80%;
    margin: 40px auto 0px auto;
    font-size: 14px;
    background: black;
    color: white;
    padding: 10px;
    &:empty {
        margin: 0px;
        padding: 0px;
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        max-width: 100%;
        font-size: 13px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 12px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 11px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 10px;
    }
`

const ApiFeedback = () => {
    const { apiFeedback } = hooks.useApiFeedback()
    return <ApiFeedbackContainer>{apiFeedback}</ApiFeedbackContainer>
}

export default ApiFeedback

import styled from 'styled-components/macro'

export const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        order: 1;
        margin-bottom: 40px;
    }
`

import styled from 'styled-components/macro'

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 0.5;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        display: none;
    }
`

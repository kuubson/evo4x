import styled from 'styled-components/macro'

export default styled.ul`
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        padding: 0px 20px;
    }
`

import styled from 'styled-components/macro'

export default styled.ul`
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        padding: 0px 20px;
    }
`

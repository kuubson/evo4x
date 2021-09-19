import styled from 'styled-components/macro'

export default styled.img`
    max-width: 100%;
    height: 350px;
    border-radius: 10px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        height: 35vh;
    }
`

import styled from 'styled-components/macro'

export default styled.img`
    max-width: 100%;
    height: 350px;
    border-radius: 10px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        max-width: 75vw;
        height: 35vh;
    }
`

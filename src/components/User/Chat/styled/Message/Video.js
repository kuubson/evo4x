import styled from 'styled-components/macro'

export default styled.video`
    max-width: 100%;
    height: 400px;
    border-radius: 10px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        height: 50vh;
    }
`

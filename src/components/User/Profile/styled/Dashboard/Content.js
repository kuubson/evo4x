import styled from 'styled-components/macro'

export default styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        flex-direction: column;
    }
`
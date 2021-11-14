import styled from 'styled-components/macro'

export default styled.form`
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        order: 2;
        width: 90%;
    }
`

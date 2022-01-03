import styled from 'styled-components/macro'

export const Avatar = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid black;
    object-fit: cover;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        width: 120px;
        height: 120px;
    }
`

import styled, { css } from 'styled-components/macro'

export default styled.button`
    border-bottom: 3px solid ${({ theme }) => theme.primaryColor};
    margin: 60px auto 0px auto;
    padding: 10px 30px;
    text-shadow: 1px 1px white;
    font-size: 22px;
    transition: all ease-in-out 0.3s;
    transition-property: border-radius, box-shadow;
    &:hover {
        border-radius: 10px;
        box-shadow: inset 0px -50px ${({ theme }) => theme.primaryColor};
    }
    ${({ fill }) =>
        fill &&
        css`
            border-radius: 10px;
            box-shadow: inset 0px -50px ${({ theme }) => theme.primaryColor};
        `}
`

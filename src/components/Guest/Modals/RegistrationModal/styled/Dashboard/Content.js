import styled, { css } from 'styled-components/macro'

export default styled.dialog`
    width: 50%;
    height: 80%;
    background: ${({ theme }) => theme.primaryColor};
    padding: 20px;
    border-radius: 10px;
    transition: transform ease-in-out 0.6s, top ease-in-out 0.6s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -100%);
    ${({ showRegistrationModal }) =>
        showRegistrationModal &&
        css`
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `}
`

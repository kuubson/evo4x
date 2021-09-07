import styled, { css } from 'styled-components/macro'

export default styled.dialog`
    width: 50%;
    height: 80%;
    background: ${({ theme }) => theme.primaryColor};
    padding: 20px;
    border-radius: 10px;
    transition: width ease-in-out 0.3s, height ease-in-out 0.3s, border-radius ease-in-out 0.3s,
        transform ease-in-out 0.6s, top ease-in-out 0.6s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -100%);
    @media (max-width: 1000px) {
        width: 60%;
    }
    @media (max-width: 750px) {
        width: 80%;
    }
    @media (max-width: 500px) {
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }
    ${({ showRegistrationModal }) =>
        showRegistrationModal &&
        css`
            top: 50%;
            transform: translate(-50%, -50%);
        `}
`

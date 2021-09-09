import styled, { css } from 'styled-components/macro'

export default styled.aside`
    width: 350px;
    height: 100%;
    background: ${({ theme }) => theme.primaryColor};
    transition: width ease-in-out 0.3s, transform ease-in-out 0.6s;
    box-shadow: -5px 0px 15px -10px white;
    transform: translateX(100%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 750px) {
        width: 300px;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
    ${({ showSidebar }) =>
        showSidebar &&
        css`
            transform: translateX(0px);
        `}
`

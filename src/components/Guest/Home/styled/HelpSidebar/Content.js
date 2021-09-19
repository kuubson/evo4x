import styled, { css } from 'styled-components/macro'

export default styled.aside`
    width: 350px;
    height: 100%;
    padding-top: 40px;
    background: ${({ theme }) => theme.primaryColor};
    box-shadow: -5px 0px 15px -10px white;
    transition: width ease-in-out 0.3s, transform ease-in-out 0.6s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    right: 0px;
    transform: translateX(100%);
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        width: 300px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        width: 100%;
    }
    ${({ showSidebar }) =>
        showSidebar &&
        css`
            transform: translateX(0px);
        `}
`

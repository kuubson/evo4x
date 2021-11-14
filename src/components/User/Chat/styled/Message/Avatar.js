import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 40px;
    height: 40px;
    margin-left: 15px;
    background: ${({ src }) => `url(${src})`} no-repeat center center;
    background-size: 100% 100%;
    font-size: 16px;
    border-radius: 50%;
    color: black;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -2px;
    right: -50px;
    &::before {
        max-width: 50px;
        border-radius: 5px;
        cursor: initial;
        content: ${({ name }) => `'${name}'`};
        font-size: 10px;
        opacity: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: initial;
        position: absolute;
        top: 50%;
        left: calc(100% + 10px);
        transform: translate(0px, -50%);
        transition: opacity ease-in-out 0.5s;
    }
    &:hover {
        &::before {
            opacity: 1;
        }
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        width: 37px;
        height: 37px;
        font-size: 15px;
        right: -47px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        width: 34px;
        height: 34px;
        font-size: 14px;
        right: -44px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        width: 31px;
        height: 31px;
        font-size: 13px;
        right: -41px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        width: 28px;
        height: 28px;
        font-size: 12px;
        right: -38px;
    }
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  left: -65px;
                  &::before {
                      left: auto;
                      right: calc(100% + 10px);
                  }
                  @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
                      left: -62px;
                  }
                  @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
                      left: -59px;
                  }
                  @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
                      left: -56px;
                  }
                  @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
                      left: -53px;
                  }
              `
            : null}
`

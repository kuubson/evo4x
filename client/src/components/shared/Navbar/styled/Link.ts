import styled, { css } from 'styled-components/macro'

type StyledProps = {
    active: boolean
    counter: number | undefined
    withHamburger?: boolean
}

export const Link = styled.li<StyledProps>`
    margin-right: 20px;
    white-space: nowrap;
    cursor: pointer;
    transition: all ease-in-out 0.5s;
    transition-property: margin, font-size;
    position: relative;
    &:hover {
        font-weight: bold;
    }
    &:last-of-type {
        margin-right: 0px;
        margin-bottom: 0px;
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 15px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 14px;
        display: flex;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        font-size: 13px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 12px;
    }
    ${({ active }) =>
        active
            ? css`
                  font-weight: bold;
              `
            : null}
    ${({ counter }) =>
        counter
            ? css`
                  &::after {
                      width: 20px;
                      height: 20px;
                      background: ${({ theme }) => theme.primaryColor};
                      padding-top: 2px;
                      border: 1px solid black;
                      border-radius: 50%;
                      cursor: initial;
                      content: '${counter}';
                      font-size: 11px;
                      font-weight: bold;
                      color: black;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      position: absolute;
                      top: -18px;
                      right: -18px;
                      @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
                          margin-left: 8px;
                          background: black;
                          color: white;
                          position: static;
                      }
                  }
              `
            : null}
    ${({ withHamburger }) =>
        withHamburger
            ? css`
                  margin-right: 0px;
                  margin-bottom: 15px;
                  @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
                      font-size: 16px;
                  }
                  @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
                      font-size: 15px;
                  }
                  @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
                      font-size: 14px;
                  }
                  @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
                      font-size: 13px;
                  }
              `
            : null}
`

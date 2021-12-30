import styled, { css } from 'styled-components/macro'

type Content = {
    withCurrentUser: boolean
    withLastUserMessage: boolean
    withFile?: boolean
    withError?: boolean
}

export default styled.div<Content>`
    width: max-content;
    max-width: 70%;
    padding: 8px 15px;
    margin-bottom: 10px;
    border: 1px solid black;
    background: ${({ theme }) => theme.primaryColor};
    font-size: 15px;
    border-radius: 12px;
    white-space: pre-line;
    cursor: pointer;
    color: black;
    position: relative;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 14px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 13px;
    }
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding: 7px 12px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        font-size: 12px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 11px;
    }
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  align-self: flex-end;
              `
            : null}
    ${({ withCurrentUser, withLastUserMessage }) =>
        withLastUserMessage
            ? withCurrentUser
                ? css`
                      border-bottom-left-radius: 2px;
                  `
                : css`
                      border-bottom-right-radius: 2px;
                  `
            : null}
    ${({ withFile }) =>
        withFile
            ? css`
                  font-weight: bold;
                  cursor: pointer;
              `
            : null}
    ${({ withError }) =>
        withError
            ? css`
                  font-weight: bold;
              `
            : null}
`

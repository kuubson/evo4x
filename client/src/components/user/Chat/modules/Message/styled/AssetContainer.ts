import styled, { css } from 'styled-components/macro'

type StyledProps = {
    withCurrentUser: boolean
}

export const AssetContainer = styled.div<StyledProps>`
    min-height: 40px;
    margin-bottom: 10px;
    border-radius: 12px;
    background: ${({ theme }) => theme.primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    position: relative;
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  align-self: flex-end;
              `
            : null}
`

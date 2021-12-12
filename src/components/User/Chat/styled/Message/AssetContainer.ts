import styled, { css } from 'styled-components/macro'

type AssetContainer = {
    withCurrentUser?: boolean
}

export default styled.div<AssetContainer>`
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

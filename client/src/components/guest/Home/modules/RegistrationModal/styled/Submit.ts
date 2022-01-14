import styled, { css } from 'styled-components/macro'

import { Button } from 'components/shared/styledComponents'

type StyledProps = {
    scaleIn?: boolean
}

export const Submit = styled(Button)<StyledProps>`
    max-height: 0px;
    margin: 0px auto;
    padding: 0px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    transition-property: max-height, margin, padding;
    ${({ scaleIn }) =>
        scaleIn || scaleIn === undefined
            ? css`
                  max-height: 43px;
                  margin: 40px auto 0px auto;
                  padding: 12px 30px;
              `
            : null}
`

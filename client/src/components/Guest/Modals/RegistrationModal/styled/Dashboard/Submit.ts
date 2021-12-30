import styled, { css } from 'styled-components/macro'

import sharedStyled from 'components/Shared/styled'

type Submit = {
    scaleIn?: boolean
}

export default styled(sharedStyled.Button)<Submit>`
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

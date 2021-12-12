import styled, { css } from 'styled-components/macro'

type BlackLayer = {
    showLayer?: boolean
}

export default styled.section<BlackLayer>`
    width: 100%;
    height: 100%;
    transition: background ease-in-out 0.3s;
    position: absolute;
    z-index: 3;
    pointer-events: none;
    ${({ showLayer }) =>
        showLayer
            ? css`
                  background: rgba(0, 0, 0, 0.5);
                  pointer-events: auto;
              `
            : null}
`
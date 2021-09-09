import styled, { css } from 'styled-components/macro'

import { Button } from 'components/Shared/Button/Button'

export default styled(Button)`
    margin-bottom: 40px;
    padding: 10px 20px;
    border-radius: 0px;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
    }
    &:last-of-type {
        margin-bottom: 0px;
    }
    ${({ active }) =>
        active &&
        css`
            transform: scale(1.03);
            border-bottom: 2px solid white;
        `}
`
import styled from 'styled-components/macro'

import sharedStyled from 'components/Shared/styled'

export default styled(sharedStyled.Button)`
    padding: 8px 10px;
    margin-right: 15px;
    background: none;
    border: 1px solid black;
    white-space: nowrap;
    color: black;
    cursor: pointer;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding: 6px 8px;
        margin-right: 10px;
        font-size: 11px;
    }
`

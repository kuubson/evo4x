import styled from 'styled-components/macro'

export default styled.svg`
    width: ${({ dimension }) => dimension}px;
    height: ${({ dimension }) => dimension}px;
    stroke-width: 2;
    stroke: black;
    fill: transparent;
`

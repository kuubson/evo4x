import styled from 'styled-components/macro'

type Rings = {
    dimension: number
}

export default styled.svg<Rings>`
    width: ${({ dimension }) => dimension}px;
    height: ${({ dimension }) => dimension}px;
    stroke-width: 2;
    stroke: black;
    fill: transparent;
`

import styled from 'styled-components/macro'

type RingsContainer = {
    dimension: number
}

export default styled.div<RingsContainer>`
    width: ${({ dimension }) => dimension}px;
    height: ${({ dimension }) => dimension}px;
    position: relative;
`

import styled, { css } from 'styled-components/macro'

export default styled.h2`
    max-height: 50px;
    margin-bottom: 50px;
    font-size: 25px;
    white-space: pre-line;
    line-height: 2;
    font-weight: bold;
    text-shadow: 1px 1px white;
    transition: all 0.3s ease-in-out;
    transition-property: max-height, margin-bottom, transform;
    ${({ scaleOut }) =>
        scaleOut &&
        css`
            max-height: 0px;
            margin-bottom: 0px;
            transform: scale(0);
        `};
`

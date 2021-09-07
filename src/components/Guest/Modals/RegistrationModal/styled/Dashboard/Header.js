import styled, { css } from 'styled-components/macro'

export default styled.h2`
    max-height: 50px;
    margin-bottom: 30px;
    font-size: 25px;
    white-space: pre-line;
    line-height: 2;
    font-weight: bold;
    text-shadow: 1px 1px white;
    transition: all 0.3s ease-in-out;
    transition-property: max-height, margin-bottom, transform;
    @media (max-width: 1200px) {
        font-size: 23px;
    }
    @media (max-width: 1000px) {
        font-size: 21px;
    }
    @media (max-width: 750px) {
        font-size: 19px;
    }
    @media (max-width: 500px) {
        font-size: 17px;
    }
    ${({ scaleOut }) =>
        scaleOut &&
        css`
            max-height: 0px;
            margin-bottom: 0px;
            transform: scale(0);
        `};
`

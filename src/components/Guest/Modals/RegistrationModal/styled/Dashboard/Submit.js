import styled, { css } from 'styled-components/macro'

export default styled.button`
    max-height: 0px;
    background: black;
    margin: 0px auto;
    overflow: hidden;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    transition-property: max-height, margin, padding;
    ${({ scaleIn }) =>
        scaleIn &&
        css`
            max-height: 43px;
            margin: 60px auto 0px auto;
            padding: 12px 30px;
        `};
`

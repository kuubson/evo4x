import styled, { css } from 'styled-components/macro'

export default styled.p`
    font-size: 14px;
    margin-bottom: 40px;
    background: black;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
    }
    &:last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: 1200px) {
        max-width: 100%;
        font-size: 13px;
    }
    @media (max-width: 1000px) {
        font-size: 12px;
    }
    @media (max-width: 750px) {
        font-size: 11px;
    }
    @media (max-width: 500px) {
        font-size: 10px;
    }
    ${({ active }) =>
        active &&
        css`
            transform: scale(1.03);
            border-bottom: 2px solid white;
        `}
`

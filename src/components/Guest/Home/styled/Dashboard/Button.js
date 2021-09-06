import styled, { css } from 'styled-components/macro'

export default styled.button`
    margin-top: 3px;
    padding: 15px;
    transition: transform ease-in-out 0.3s;
    position: relative;
    &::after {
        content: '';
        width: 100%;
        height: 0px;
        background: black;
        transition: height ease-in-out 0.3s;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }
    &:hover {
        transform: scale(1.08);
        &::after {
            height: 2.5px;
        }
    }
    ${({ fill }) =>
        fill &&
        css`
            &::after {
                height: 2.5px;
            }
        `}
`

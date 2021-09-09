import styled from 'styled-components/macro'

export default styled.li`
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
    }
    &:last-of-type {
        margin-right: 0px;
    }
    @media (max-width: 1200px) {
        font-size: 15px;
    }
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 750px) {
        font-size: 13px;
    }
    @media (max-width: 500px) {
        font-size: 12px;
    }
`

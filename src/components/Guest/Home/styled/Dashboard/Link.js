import styled from 'styled-components/macro'

export default styled.li`
    margin-right: 20px;
    cursor: pointer;
    &:last-of-type {
        margin-right: 0px;
    }
    &:hover {
        transform: scale(1.05);
    }
`

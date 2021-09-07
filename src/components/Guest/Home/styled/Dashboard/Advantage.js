import styled from 'styled-components/macro'

export default styled.li`
    margin-bottom: 30px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: 1200px) {
        font-size: 18px;
    }
    @media (max-width: 1000px) {
        font-size: 16px;
    }
    @media (max-width: 750px) {
        font-size: 14px;
    }
    @media (max-width: 500px) {
        font-size: 12px;
    }
`

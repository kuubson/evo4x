import styled from 'styled-components/macro'

export default styled.div`
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
    position: absolute;
    top: 25px;
    right: 30px;
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
`

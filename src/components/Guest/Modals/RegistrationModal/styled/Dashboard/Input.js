import styled from 'styled-components/macro'

export default styled.input`
    width: 100%;
    border-bottom: 1px solid black;
    padding: 10px 0px;
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

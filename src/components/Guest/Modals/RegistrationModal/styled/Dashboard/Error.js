import styled from 'styled-components/macro'

export default styled.p`
    text-align: left;
    font-size: 12px;
    margin-top: 5px;
    @media (max-width: 1200px) {
        font-size: 11px;
    }
    @media (max-width: 1000px) {
        font-size: 10px;
    }
`

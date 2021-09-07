import styled from 'styled-components/macro'

export default styled.h1`
    font-size: 30px;
    text-shadow: 1px 1px black;
    @media (max-width: 1200px) {
        font-size: 28px;
    }
    @media (max-width: 1000px) {
        font-size: 26px;
    }
    @media (max-width: 750px) {
        font-size: 24px;
    }
    @media (max-width: 500px) {
        font-size: 22px;
    }
`

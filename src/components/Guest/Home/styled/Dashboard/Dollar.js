import styled from 'styled-components/macro'

export default styled.div`
    margin-right: 10px;
    font-size: 25px;
    font-weight: bold;
    text-shadow: 2px 2px ${({ theme }) => theme.primaryColor};
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

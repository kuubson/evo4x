import styled, { css } from 'styled-components/macro'

export default styled.img`
    width: 200px;
    margin-bottom: 50px;
    @media (max-width: 1200px) {
        width: 150px;
    }
    @media (max-width: 1000px) {
        width: 130px;
    }
    ${({ mobile }) =>
        mobile &&
        css`
            display: none;
            @media (max-width: 900px) {
                width: 80px;
                display: block;
                margin: 30px auto 0px auto;
            }
            @media (max-width: 750px) {
                width: 70px;
            }
            @media (max-width: 500px) {
                width: 60px;
            }
        `}
`

import styled from 'styled-components/macro'

export default styled.button`
    background: ${({ theme }) => theme.primaryColor};
    margin: 60px auto 0px auto;
    padding: 10px 30px;
    border-radius: 10px;
    text-shadow: 1px 1px white;
    font-size: 22px;
    transition: transform ease-in-out 0.3s;
    &:hover {
        transform: scale(1.05);
    }
`

import styled from 'styled-components/macro'

export default styled.div`
    width: 100%;
    height: 80px;
    background: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    margin-top: 15px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

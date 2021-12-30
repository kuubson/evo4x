import styled from 'styled-components/macro'

export default styled.div`
    width: calc(100% - 20px);
    height: 80px;
    background: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 20px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

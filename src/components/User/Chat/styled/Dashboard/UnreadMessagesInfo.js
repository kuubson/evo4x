import styled from 'styled-components/macro'

export default styled.div`
    padding: 8px 15px;
    background: ${({ theme }) => theme.primaryColor};
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    box-shadow: 0px 0px 15px -10px black;
    cursor: pointer;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%, 0px);
    z-index: 1;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        font-size: 10px;
    }
`

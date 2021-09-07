import styled from 'styled-components/macro'

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 0.5;
    @media (max-width: 900px) {
        display: none;
    }
`

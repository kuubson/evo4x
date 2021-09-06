import styled from 'styled-components/macro'

export default styled.button`
    padding: 12px 20px;
    border-radius: 10px;
    transition: box-shadow ease-in-out 0.3s, color ease-in-out 0.3s;
    &:hover {
        box-shadow: inset 0px -50px 0px 0px black;
        color: white;
    }
`

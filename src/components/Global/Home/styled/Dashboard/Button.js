import styled from 'styled-components/macro'

export default styled.button`
    padding: 12px 20px;
    border: 3px solid #ffff00;
    border-radius: 8px;
    transition: transform ease-in-out 0.3s, box-shadow ease-in-out 0.4s;
    &:hover {
        margin-top: 1px;
        border: 2px solid #ffff00;
        box-shadow: 0px 0px 20px -15px black;
        transform: scale(1.03);
    }
`

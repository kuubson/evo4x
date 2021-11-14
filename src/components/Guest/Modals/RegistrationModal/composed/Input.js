import React from 'react'
import styled from 'styled-components/macro'

import Dashboard from '../styled/Dashboard'

const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    &:last-of-type {
        margin-bottom: 0px;
    }
`

const Input = ({ id, name, type, label, value, placeholder, error, onChange }) => {
    return (
        <InputContainer>
            <Dashboard.Label htmlFor={id}>{label}</Dashboard.Label>
            {type === 'textarea' ? (
                <Dashboard.Textarea
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            ) : (
                <Dashboard.Input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            )}
            {error && <Dashboard.Error>{error}</Dashboard.Error>}
        </InputContainer>
    )
}

export default Input

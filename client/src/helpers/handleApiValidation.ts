import React from 'react'

type ApiValidationHandler = <T>(
    error: any,
    setForm: React.Dispatch<React.SetStateAction<T>>
) => void

type Result = {
    parameter: string
    error: string
}

type Response = {
    status: number
    data: {
        results: Result[]
    }
}

export const handleApiValidation: ApiValidationHandler = (error, setForm) => {
    let errors = {}
    const response: Response = error.response
    if (response && response.status === 422) {
        response.data.results.map(
            ({ parameter, error }) =>
                (errors = {
                    ...errors,
                    [`${parameter}Error`]: error
                })
        )
        setForm(form => ({
            ...form,
            ...errors
        }))
    }
}

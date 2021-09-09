const handleApiValidation = (error, setForm) => {
    let errors = {}
    const response = error.response
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

export default handleApiValidation

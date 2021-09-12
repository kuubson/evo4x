import { validationResult } from 'express-validator'

const checkValidation = (req, res, next) => {
    const results = validationResult(req)
    if (!results.isEmpty()) {
        return res.status(422).send({
            results: results.array().map(({ param: parameter, msg: error }) => {
                return {
                    parameter,
                    error
                }
            })
        })
    }
    next()
}

export default checkValidation

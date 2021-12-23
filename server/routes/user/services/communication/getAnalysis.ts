import { Analysis } from 'database/database'

import helpers from 'helpers'
import userHelpers from 'routes/user/helpers'

import { ProtectedRoute } from 'types/express'

const getAnalysis: ProtectedRoute = async (req, res, next) => {
    try {
        const { id } = req.user
        const { limit, offset } = req.body
        const analysis = await Analysis.findAll({
            limit,
            offset,
            attributes: {
                exclude: ['adminId']
            }
        })
        const updatedAnalysis = await userHelpers.updateReadByProperty(id, analysis)
        const analysisWithViews = updatedAnalysis.map(analysis => ({
            ...analysis.dataValues,
            views: userHelpers.countAnalysisViews(analysis)
        }))
        res.send({
            analysis: analysisWithViews
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    helpers.validator.validateInteger('limit'),
    helpers.validator.validateInteger('offset')
]

export default getAnalysis

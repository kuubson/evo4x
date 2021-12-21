import { Analysis } from 'database/database'

import utils from 'utils'

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
    utils.validator.validateInteger('limit'),
    utils.validator.validateInteger('offset')
]

export default getAnalysis

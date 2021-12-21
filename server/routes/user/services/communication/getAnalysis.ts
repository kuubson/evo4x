import { Analysis } from 'database/database'

import utils from 'utils'

import { ProtectedRoute } from 'types/express'
import userUtils from 'routes/user/utils'

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
        const updatedAnalysis = await userUtils.updateReadByProperty(id, analysis)
        const analysisWithViews = updatedAnalysis.map(analysis => ({
            ...analysis.dataValues,
            views: userUtils.countAnalysisViews(analysis)
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

import { Analysis } from 'database'

import { validator } from 'helpers'
import { updateReadByProperty, countAnalysisViews } from 'routes/user/helpers'

import { ProtectedRoute } from 'types/express'

export const getAnalysis: ProtectedRoute = async (req, res, next) => {
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
        const updatedAnalysis = await updateReadByProperty(id, analysis)
        const analysisWithViews = updatedAnalysis.map(analysis => ({
            ...analysis.dataValues,
            views: countAnalysisViews(analysis)
        }))
        res.send({
            analysis: analysisWithViews
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateInteger('limit'),
    validator.validateInteger('offset')
]

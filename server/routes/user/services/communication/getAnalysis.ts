import { Analysis } from 'database/database'

import utils from 'utils'

import { ProtectedRoute } from 'types/express'

const getAnalysis: ProtectedRoute = async (req, res, next) => {
    try {
        const { id } = req.user
        const { limit, offset } = req.body
        const analysis = await Analysis.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            attributes: {
                exclude: ['adminId']
            }
        }).then(
            async analysis =>
                await Promise.all(
                    analysis
                        .sort((a, b) => a.id - b.id)
                        .map(async analysis => {
                            const readByIds = analysis.readBy.split(',').filter(v => v)
                            const ID = id.toString()
                            if (!readByIds.includes(ID)) {
                                readByIds.push(ID)
                            }
                            await analysis.update({
                                readBy: readByIds.join(',')
                            })
                            return {
                                ...analysis.dataValues,
                                views: readByIds.length
                            }
                        })
                )
        )
        res.send({
            analysis
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

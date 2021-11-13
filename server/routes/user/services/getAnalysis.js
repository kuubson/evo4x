import { Admin, Analysis } from '@database'

import utils from '@utils'

const getAnalysis = async (req, res, next) => {
    const { id } = req.user
    try {
        const { limit, offset } = req.body
        const analysis = await Analysis.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            attributes: {
                exclude: 'adminId'
            },
            include: [
                {
                    model: Admin,
                    attributes: ['id']
                }
            ]
        }).then(
            async analysis =>
                await Promise.all(
                    analysis
                        .sort((a, b) => a.id - b.id)
                        .map(async analysis => {
                            const readByIds = analysis.readBy.split(',').filter(v => v)
                            if (!readByIds.includes(id.toString())) {
                                readByIds.push(id)
                            }
                            await analysis.update({
                                readBy: readByIds.join(',')
                            })
                            return analysis
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

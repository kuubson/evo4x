import { Sequelize, Model, ENUM, TEXT } from 'sequelize'

class AnalysisValues extends Model {
    id: number
    type: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
    content: string
    readBy: string
    cloudinaryId: string
}

export class Analysis extends AnalysisValues {
    dataValues: AnalysisValues
}

const AnalysisModel = (sequelize: Sequelize) => {
    Analysis.init(
        {
            type: {
                type: ENUM('MESSAGE', 'IMAGE', 'VIDEO', 'FILE'),
                allowNull: false
            },
            content: {
                type: TEXT,
                allowNull: false
            },
            readBy: {
                type: TEXT,
                defaultValue: ''
            },
            cloudinaryId: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'analysis',
            freezeTableName: true
        }
    )
    return Analysis
}

export default AnalysisModel

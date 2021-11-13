import { Model, ENUM, TEXT } from 'sequelize'

const Analysis = sequelize => {
    class Analysis extends Model {}
    Analysis.init(
        {
            type: {
                type: ENUM(['MESSAGE', 'IMAGE', 'VIDEO', 'FILE']),
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

export default Analysis

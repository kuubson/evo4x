import { Model, ENUM, TEXT } from 'sequelize'

const Message = sequelize => {
    class Message extends Model {}
    Message.init(
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
            modelName: 'message'
        }
    )
    return Message
}

export default Message

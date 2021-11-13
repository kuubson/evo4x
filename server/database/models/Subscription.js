import { Model, STRING } from 'sequelize'

const Subscription = sequelize => {
    class Subscription extends Model {}
    Subscription.init(
        {
            endpoint: {
                type: STRING,
                allowNull: false
            },
            p256dh: {
                type: STRING,
                allowNull: false
            },
            auth: {
                type: STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'subscription'
        }
    )
    return Subscription
}

export default Subscription

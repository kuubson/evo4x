import { Model, TEXT, BOOLEAN } from 'sequelize'

const Authentication = sequelize => {
    class Authentication extends Model {}
    Authentication.init(
        {
            emailToken: {
                type: TEXT,
                allowNull: false
            },
            authenticated: {
                type: BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'authentication'
        }
    )
    return Authentication
}

export default Authentication

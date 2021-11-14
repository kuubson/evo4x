import { Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

const User = sequelize => {
    class User extends Model {}
    User.init(
        {
            email: {
                type: STRING,
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            },
            passwordToken: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate: user => {
                    user.password = bcrypt.hashSync(user.password, 11)
                }
            }
        }
    )
    return User
}

export default User

import { Sequelize, Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

import { Authentication } from './Authentication'
import { Message } from './Message'
import { Subscription } from './Subscription'
import { Profile } from './Profile'

class UserValues extends Model {
    id: number
    name: string
    email: string
    password: string
    passwordToken: string
}

class UserAssociations extends UserValues {
    authentication: Authentication
    profile: Profile

    subscriptions: Subscription[]
    createSubscription: (parameters: object, options?: object) => Promise<Subscription>
    getSubscriptions: (parameters?: object) => Promise<Subscription[]>

    createMessage: (parameters: object, options?: object) => Promise<Message>
}

export class User extends UserAssociations {
    dataValues: UserValues
}

const UserModel = (sequelize: Sequelize) => {
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
                beforeCreate: (user: User) => {
                    user.password = bcrypt.hashSync(user.password, 11)
                }
            }
        }
    )
    return User
}

export default UserModel

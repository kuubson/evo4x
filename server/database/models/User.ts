import bcrypt from 'bcrypt'
import type { Sequelize } from 'sequelize'
import { Model, STRING, TEXT } from 'sequelize'

import type { Authentication } from './Authentication'
import type { Message } from './Message'
import type { Profile } from './Profile'
import type { Subscription } from './Subscription'

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
            allowNull: false,
         },
         password: {
            type: TEXT,
            allowNull: false,
         },
         passwordToken: { type: TEXT },
      },
      {
         sequelize,
         modelName: 'user',
         hooks: {
            beforeCreate: (user: User) => {
               user.password = bcrypt.hashSync(user.password, 11)
            },
         },
      }
   )
   return User
}

export default UserModel

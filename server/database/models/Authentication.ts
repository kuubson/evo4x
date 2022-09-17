import type { Sequelize } from 'sequelize'
import { BOOLEAN, Model, TEXT } from 'sequelize'

class AuthenticationValues extends Model {
   id: number
   emailToken: string
   authenticated: boolean
}

export class Authentication extends AuthenticationValues {
   dataValues: AuthenticationValues
}

const AuthenticationModel = (sequelize: Sequelize) => {
   Authentication.init(
      {
         emailToken: {
            type: TEXT,
            allowNull: false,
         },
         authenticated: {
            type: BOOLEAN,
            defaultValue: false,
         },
      },
      {
         sequelize,
         modelName: 'authentication',
      }
   )
   return Authentication
}

export default AuthenticationModel

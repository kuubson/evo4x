import bcrypt from 'bcrypt'
import type { Sequelize } from 'sequelize'
import { Model, STRING, TEXT } from 'sequelize'

class AdminValues extends Model {
   id: number
   email: string
   password: string
}

export class Admin extends AdminValues {
   dataValues: AdminValues
}

const AdminModel = (sequelize: Sequelize) => {
   Admin.init(
      {
         email: {
            type: STRING,
            allowNull: false,
         },
         password: {
            type: TEXT,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'admin',
         hooks: {
            beforeCreate: (admin: Admin) => {
               admin.password = bcrypt.hashSync(admin.password, 11)
            },
         },
      }
   )
   return Admin
}

export default AdminModel

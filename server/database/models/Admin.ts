import { Sequelize, Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

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
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'admin',
            hooks: {
                beforeCreate: admin => {
                    admin.password = bcrypt.hashSync(admin.password, 11)
                }
            }
        }
    )
    return Admin
}

export default AdminModel

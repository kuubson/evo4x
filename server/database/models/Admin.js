import { Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

const Admin = sequelize => {
    class Admin extends Model {}
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

export default Admin

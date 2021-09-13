import sequelize from 'sequelize'

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env

const connection = new sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
    // logging: false
})

import UserModel from './models/User'
import AuthenticationModel from './models/Authentication'

const User = UserModel(connection)
const Authentication = AuthenticationModel(connection)

User.hasOne(Authentication)
Authentication.belongsTo(User)

const init = async () => {
    try {
        // await connection.sync({ force: true })
        // await connection.sync({ alter: true })
        await connection.sync()
        console.log('The connection has been established with the database')
    } catch (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the database'
        })
    }
}
init()

export { connection as Connection, User, Authentication }

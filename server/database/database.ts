import { Sequelize } from 'sequelize'

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env

const connection = new Sequelize(DATABASE_NAME!, DATABASE_USERNAME!, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
})

import AdminModel from './models/Admin'
import UserModel from './models/User'
import AuthenticationModel from './models/Authentication'
import ProfileModel from './models/Profile'
import MessageModel from './models/Message'
import AnalysisModel from './models/Analysis'
import SubscriptionModel from './models/Subscription'

export const Admin = AdminModel(connection)
export const User = UserModel(connection)
export const Authentication = AuthenticationModel(connection)
export const Profile = ProfileModel(connection)
export const Message = MessageModel(connection)
export const Analysis = AnalysisModel(connection)
export const Subscription = SubscriptionModel(connection)

Admin.hasMany(Analysis)
Analysis.belongsTo(Admin)

User.hasOne(Authentication)
Authentication.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

User.hasMany(Subscription)
Subscription.belongsTo(User)

const initializeDatabase = async () => {
    try {
        // await connection.sync({ force: true })
        // await connection.sync({ alter: true })
        await connection.sync()
        console.log('The database connection has been established')
    } catch (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the database'
        })
    }
}
initializeDatabase()

export { connection as Connection }

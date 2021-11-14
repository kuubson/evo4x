import { Model, STRING, TEXT } from 'sequelize'

const Profile = sequelize => {
    class Profile extends Model {}
    Profile.init(
        {
            name: {
                type: STRING,
                allowNull: false
            },
            story: {
                type: TEXT,
                defaultValue: ''
            },
            avatar: {
                type: TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'profile'
        }
    )
    return Profile
}

export default Profile

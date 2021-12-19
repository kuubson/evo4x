import { Sequelize, Model, STRING, TEXT } from 'sequelize'

class ProfileValues extends Model {
    name: string
    story: string
    avatar: string
    avatarCloudinaryId: string
}

export class Profile extends ProfileValues {
    dataValues: ProfileValues
}

const ProfileModel = (sequelize: Sequelize) => {
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
            },
            avatarCloudinaryId: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'profile'
        }
    )
    return Profile
}

export default ProfileModel

import { Router } from 'express'

import { checkValidation, handleMulterFile, jwtAuthorization } from 'middlewares'

import { profile } from '../services'

export const Profile = Router()

Profile.get('/getProfile', jwtAuthorization, profile.getProfile.getProfile as any)

Profile.post(
   '/updateProfile',
   jwtAuthorization,
   profile.updateProfile.validation(),
   checkValidation,
   profile.updateProfile.updateProfile as any
)

Profile.post(
   '/changeAvatar',
   jwtAuthorization,
   handleMulterFile() as any,
   profile.changeAvatar.changeAvatar as any
)

Profile.get('/removeAvatar', jwtAuthorization, profile.removeAvatar.removeAvatar as any)

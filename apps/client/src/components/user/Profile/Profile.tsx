import { useState } from 'react'
import styled from 'styled-components/macro'

import * as Styled from './styled'
import { FileInput } from 'components/user/Chat/styled'

import Input from 'components/guest/Home/modules/RegistrationModal/components/Input'
import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

import { useProfile } from './hooks'

const ProfileContainer = styled.section`
   min-height: 100%;
   padding: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
`

const Profile = () => {
   const [showAvatarInput, setShowAvatarInput] = useState(true)
   const {
      profile: { name, nameError, story, storyError },
      profileHandler,
      avatar,
      withDefaultAvatar,
      updateProfile,
      changeAvatar,
      removeAvatar,
   } = useProfile({ setShowAvatarInput })
   return (
      <ProfileContainer>
         <Styled.Content>
            <Styled.Info onSubmit={updateProfile}>
               <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={name}
                  placeholder="Type your name"
                  error={nameError}
                  onChange={profileHandler.handleInputValue}
               />
               <Input
                  id="story"
                  name="story"
                  type="textarea"
                  label="About your trading"
                  value={story}
                  placeholder="Type the story of your trading"
                  error={storyError}
                  onChange={profileHandler.handleInputValue}
               />
               <Styled.Button>Update profile</Styled.Button>
               <ApiFeedback />
            </Styled.Info>
            <Styled.AvatarContainer>
               <Styled.Avatar src={avatar} />
               <Styled.Buttons>
                  <Styled.Button as="label" htmlFor="file">
                     Change avatar
                  </Styled.Button>
                  {!withDefaultAvatar && (
                     <Styled.Button onClick={removeAvatar}>Remove avatar</Styled.Button>
                  )}
               </Styled.Buttons>
               {showAvatarInput && <FileInput onChange={changeAvatar} />}
            </Styled.AvatarContainer>
         </Styled.Content>
      </ProfileContainer>
   )
}

export default Profile

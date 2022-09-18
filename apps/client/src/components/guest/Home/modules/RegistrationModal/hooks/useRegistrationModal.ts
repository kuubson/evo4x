import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { handleApiValidation } from 'helpers'

import { axios } from 'utils'

export const useRegistrationModal = () => {
   const [form, setForm] = useState({
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      repeatedPassword: '',
      repeatedPasswordError: '',
   })
   const formHandler = useFormHandler(setForm)
   const validate = () => {
      let validated = true
      setForm(form => ({
         ...form,
         nameError: '',
         emailError: '',
         passwordError: '',
         repeatedPasswordError: '',
      }))
      const { name, email, password, repeatedPassword } = form
      if (!formHandler.validateProperty('name', name)) validated = false
      if (!formHandler.validateEmail(email)) validated = false
      if (!formHandler.validatePassword(password, repeatedPassword, false)) validated = false
      if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
      return validated
   }
   const register = async (event: React.FormEvent) => {
      event.preventDefault()
      if (validate()) {
         try {
            const url = '/api/user/auth/register'
            const { name, email, password, repeatedPassword } = form
            await axios.post(url, {
               name,
               email,
               password,
               repeatedPassword,
            })
         } catch (error) {
            handleApiValidation(error, setForm)
         }
      }
   }
   return {
      form,
      formHandler,
      register,
   }
}

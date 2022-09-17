import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import { useMessagesInfo, useSocket } from 'hooks'

import {
   handleApiError,
   pushToTheBottom,
   setApiFeedback,
   subscribePushNotifications,
} from 'helpers'

import { axios as apiAxios, filesInfo } from 'utils'

type ChatHook = {
   setShowFileInput: ReactDispatch<boolean>
   setUploadPercentage: ReactDispatch<number>
}

type GetMessagesResponse = {
   user: User
   messages: Message[]
}

type SendFileResponse = {
   type: string
   content: string
}

export const useChat = ({ setShowFileInput, setUploadPercentage }: ChatHook) => {
   const { socket } = useSocket()
   const { lastUnreadMessageIndex, setUnreadMessagesAmount } = useMessagesInfo()
   const messagesRef = useRef<HTMLDivElement>(null)
   const [messages, setMessages] = useState<Message[]>([])
   const [message, setMessage] = useState('')
   const [hasMoreMessages, setHasMoreMessages] = useState(true)
   const [isLoading, setIsLoading] = useState(true)
   const [currentUser, setCurrentUser] = useState<User | undefined>()
   const getMessages = async ({ event, limit, offset }: MessagesOrAnalysisGetterProps) => {
      const loadCachedMessage = () => {
         const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
         const savedMessages = JSON.parse(sessionStorage.getItem('messages')!)
         if (savedMessages && currentUser) {
            setIsLoading(false)
            setCurrentUser(currentUser)
            setMessages(savedMessages)
            setTimeout(() => pushToTheBottom(messagesRef, true), 0)
         }
      }
      const url = '/api/user/communication/getMessages'
      if (event) {
         const target = event.target as any
         if (target.scrollTop <= 0 && hasMoreMessages) {
            const response = await apiAxios.post<GetMessagesResponse>(url, {
               limit,
               offset,
            })
            if (response) {
               const { messages } = response.data
               setHasMoreMessages(messages.length !== 0)
               const lastScroll = target.scrollHeight
               setMessages(_messages => [...messages, ..._messages])
               target.scrollTop = target.scrollHeight - lastScroll
               if (messages.length + messages.length >= lastUnreadMessageIndex!) {
                  setUnreadMessagesAmount(0)
               }
            }
         }
      }
      if (!event) {
         loadCachedMessage()
         const response = await apiAxios.post<GetMessagesResponse>(url, {
            limit,
            offset,
         })
         if (response) {
            setIsLoading(false)
            const { user, messages } = response.data
            sessionStorage.setItem('currentUser', JSON.stringify(user))
            sessionStorage.setItem('messages', JSON.stringify(messages))
            setCurrentUser(user)
            setMessages(messages)
            pushToTheBottom(messagesRef, true)
            if (messages.length >= lastUnreadMessageIndex!) {
               setUnreadMessagesAmount(0)
            }
         }
      }
   }
   useEffect(() => {
      getMessages({
         event: undefined,
         limit: 20,
         offset: 0,
      })
      subscribePushNotifications('/api/user/communication/subscribePushNotifications')
   }, [])
   const handleOnSendMessage = (message: Message) => {
      setMessages(messages => [...messages, message])
      pushToTheBottom(messagesRef)
      socket!.emit('readMessages')
   }
   useEffect(() => {
      if (socket) {
         socket.on('sendMessage', handleOnSendMessage)
      }
      return () => {
         if (socket) {
            socket.off('sendMessage', handleOnSendMessage)
         }
      }
   }, [socket])
   const getUnreadMessages = async () => {
      const url = '/api/user/communication/getMessages'
      const response = await apiAxios.post<GetMessagesResponse>(url, {
         limit: lastUnreadMessageIndex,
         offset: 0,
      })
      if (response) {
         const { messages } = response.data
         setMessages(messages)
         setTimeout(() => {
            messagesRef.current!.scrollTop = 0
         }, 0)
         setUnreadMessagesAmount(0)
      }
   }
   const sendMessage = async () => {
      if (message.trim()) {
         const lastMessage = messages[messages.length - 1]
         const id = lastMessage ? lastMessage.id + 1 : 0
         const _message = {
            id,
            type: 'MESSAGE',
            content: message,
            createdAt: new Date(),
            user: currentUser,
         }
         setMessages(messages => [...messages, _message] as Message[])
         pushToTheBottom(messagesRef)
         setTimeout(() => setMessage(''), 0)
         try {
            const url = '/api/user/communication/sendMessage'
            const response = await axios.post(url, { content: message })
            if (response) {
               socket!.emit('sendMessage', _message)
            }
         } catch (error) {
            handleApiError(error)
            setMessages(messages)
         }
      }
   }
   const sendFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
      let intervalId: any
      let percentage = 0
      const file = event.currentTarget.files![0]
      if (file) {
         const {
            regex: { images, videos, files },
            sizes: { maxImageSize, maxVideoSize, maxFileSize },
         } = filesInfo
         const { name, size } = file
         const isImage = images.test(name)
         const isVideo = videos.test(name)
         const isFile = files.test(name)
         const resetFileInput = () => {
            setShowFileInput(false)
            setTimeout(() => setShowFileInput(true), 0)
         }
         const largeSizeError = () => {
            return setApiFeedback('You cannot send this large file')
         }
         if (!isImage && !isVideo && !isFile) {
            resetFileInput()
            return setApiFeedback('You cannot send a file with this extension')
         }
         if (isImage) {
            if (size > maxImageSize) {
               resetFileInput()
               largeSizeError()
            }
         }
         if (isVideo) {
            if (size > maxVideoSize) {
               resetFileInput()
               largeSizeError()
            }
         }
         if (isFile) {
            if (size > maxFileSize) {
               resetFileInput()
               largeSizeError()
            }
         }
         const form = new FormData()
         form.append('file', file)
         try {
            const url = '/api/user/communication/sendFile'
            intervalId = setInterval(() => {
               if (percentage < 100) {
                  percentage++
                  setUploadPercentage(percentage => percentage + 1)
               }
            }, 500)
            const response = await axios.post<SendFileResponse>(url, form)
            if (response) {
               setUploadPercentage(100)
               clearInterval(intervalId)
               setTimeout(() => setUploadPercentage(0), 800)
               const { type, content } = response.data
               const lastMessage = messages[messages.length - 1]
               const id = lastMessage ? lastMessage.id + 1 : 0
               const message = {
                  id,
                  type,
                  content,
                  filename: name,
                  createdAt: new Date(),
                  user: currentUser,
               }
               setMessages([...messages, message] as Message[])
               pushToTheBottom(messagesRef)
               resetFileInput()
               socket!.emit('sendMessage', message)
            }
         } catch (error) {
            handleApiError(error)
            setUploadPercentage(0)
            resetFileInput()
            clearInterval(intervalId)
         }
      }
   }
   return {
      messagesRef,
      messages,
      message,
      isLoading,
      currentUser,
      setMessage,
      getMessages,
      getUnreadMessages,
      sendMessage,
      sendFile,
   }
}

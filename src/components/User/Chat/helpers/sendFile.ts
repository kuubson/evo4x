import { Socket } from 'socket.io-client'
import axios from 'axios'

import utils from 'utils'

import chatHelpers from '.'

type FileSender = {
    event: React.ChangeEvent<HTMLInputElement>
    socket: Socket | undefined
    messagesRef: React.RefObject<HTMLDivElement>
    messages: Message[]
    currentUser: User | undefined
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    setShowFileInput: DispatchBoolean
    setUploadPercentage: DispatchNumber
}

const sendFile = async ({
    event,
    socket,
    messagesRef,
    messages,
    currentUser,
    setMessages,
    setShowFileInput,
    setUploadPercentage
}: FileSender) => {
    let intervalId: any
    let percentage = 0
    const file = event.currentTarget.files![0]
    if (file) {
        const path = event.target.value
        const { name, size } = file
        const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
        const videoExtensions = /\.(mp4)$/i
        const fileExtensions = /\.(txt|rtf|doc|docx|xlsx|ppt|pptx|pdf)$/i
        const isImage = imageExtensions.test(path) || imageExtensions.test(name)
        const isVideo = videoExtensions.test(path) || videoExtensions.test(name)
        const isFile = fileExtensions.test(path) || fileExtensions.test(name)
        const resetFileInput = () => {
            setShowFileInput(false)
            setTimeout(() => {
                setShowFileInput(true)
            }, 0)
        }
        const largeSizeError = () => {
            return utils.setApiFeedback('You cannot send this large file')
        }
        if (!isImage && !isVideo && !isFile) {
            resetFileInput()
            return utils.setApiFeedback('You cannot send a file with this extension')
        }
        if (isImage) {
            if (size > 31457280) {
                resetFileInput() // 30MB
                largeSizeError()
            }
        }
        if (isVideo) {
            if (size > 52428800) {
                resetFileInput() // 50MB
                largeSizeError()
            }
        }
        if (isFile) {
            if (size > 10485760) {
                resetFileInput() // 10MB
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
            const response = await axios.post(url, form)
            if (response) {
                setUploadPercentage(100)
                clearInterval(intervalId)
                setTimeout(() => {
                    setUploadPercentage(0)
                }, 800)
                const { type, content } = response.data
                const lastMessage = messages[messages.length - 1]
                const id = lastMessage ? lastMessage.id + 1 : 0
                const message = {
                    id,
                    type,
                    content,
                    createdAt: new Date(),
                    user: currentUser
                }
                setMessages([...messages, message] as Message[])
                chatHelpers.pushToTheBottom(messagesRef)
                resetFileInput()
                socket!.emit('sendMessage', message)
            }
        } catch (error) {
            utils.handleApiError(error)
            resetFileInput()
            clearInterval(intervalId)
            setUploadPercentage(0)
        }
    }
}

export default sendFile

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
        const { regex, sizes } = utils.filesInfo
        const { name, size } = file
        const isImage = regex.images.test(name)
        const isVideo = regex.videos.test(name)
        const isFile = regex.files.test(name)
        const resetFileInput = () => {
            setShowFileInput(false)
            setTimeout(() => setShowFileInput(true), 0)
        }
        const largeSizeError = () => {
            return utils.setApiFeedback('You cannot send this large file')
        }
        if (!isImage && !isVideo && !isFile) {
            resetFileInput()
            return utils.setApiFeedback('You cannot send a file with this extension')
        }
        if (isImage) {
            if (size > sizes.imageMaxSize) {
                resetFileInput()
                largeSizeError()
            }
        }
        if (isVideo) {
            if (size > sizes.maxVideoSize) {
                resetFileInput()
                largeSizeError()
            }
        }
        if (isFile) {
            if (size > sizes.maxFileSize) {
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
            const response = await axios.post(url, form)
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

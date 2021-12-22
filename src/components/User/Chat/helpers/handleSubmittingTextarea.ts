import utils from 'utils'

type SubmittingTextareaHandler = {
    event: React.KeyboardEvent<HTMLTextAreaElement>
    sendMessage: () => Promise<void>
}

const handleSubmittingTextarea = ({ event, sendMessage }: SubmittingTextareaHandler) => {
    if (event.key === 'Enter') {
        switch (true) {
            case utils.detectMobileDevice():
                return
            case !event.currentTarget.value.trim():
                event.preventDefault()
                break
            case !event.shiftKey:
                sendMessage()
                break
        }
    }
}

export default handleSubmittingTextarea

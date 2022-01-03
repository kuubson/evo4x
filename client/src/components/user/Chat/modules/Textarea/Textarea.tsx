import styled from 'styled-components/macro'

import ProgressLoader from './components/ProgressLoader/ProgressLoader'

import { FileInput } from '../../styled'
import * as Styled from './styled'

import { detectMobileDevice } from 'helpers'

const TextareaContainer = styled.div`
    width: calc(100% - 20px);
    height: 80px;
    background: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 20px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface ITextarea {
    message: string
    setMessage: ReactDispatch<string>
    textareaRef: React.RefObject<HTMLTextAreaElement>
    showFileInput: boolean
    uploadPercentage: number
    sendMessage: () => Promise<void>
    sendFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const Textarea = ({
    message,
    setMessage,
    textareaRef,
    showFileInput,
    uploadPercentage,
    sendMessage,
    sendFile
}: ITextarea) => {
    const handleSendButton = () => {
        sendMessage()
        if (detectMobileDevice()) {
            textareaRef.current!.focus()
        }
    }
    const handlePressingTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            switch (true) {
                case detectMobileDevice():
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
    const fileUploadInProgress = !!uploadPercentage
    return (
        <TextareaContainer>
            <Styled.Content
                ref={textareaRef}
                value={message}
                placeholder="Type your message"
                disabled={fileUploadInProgress}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(event.target.value)
                }
                onKeyPress={handlePressingTextarea}
            />
            <Styled.Buttons>
                {showFileInput && <FileInput onChange={sendFile} />}
                {fileUploadInProgress ? (
                    <ProgressLoader percentage={uploadPercentage} />
                ) : (
                    <Styled.Button as="label" htmlFor="file">
                        Upload 📁
                    </Styled.Button>
                )}
                <Styled.Button onClick={handleSendButton}>Send ✉️</Styled.Button>
            </Styled.Buttons>
        </TextareaContainer>
    )
}

export default Textarea

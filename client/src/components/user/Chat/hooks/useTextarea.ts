import { useRef, useState } from 'react'

export const useTextarea = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showFileInput, setShowFileInput] = useState(true)
    const [uploadPercentage, setUploadPercentage] = useState(0)
    return {
        textareaRef,
        showFileInput,
        setShowFileInput,
        uploadPercentage,
        setUploadPercentage
    }
}

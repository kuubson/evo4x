const regex = {
    images: /jpg|jpeg|png|gif/i,
    videos: /mp4/i,
    files: /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf/i
}

const sizes = {
    imageMaxSize: 31457280, // 30MB
    maxVideoSize: 52428800, // 50MB
    maxFileSize: 10485760 // 10MB
}

const filesInfo = {
    regex,
    sizes
}

export default filesInfo

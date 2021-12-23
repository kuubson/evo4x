import fs from 'fs'

const deleteTemporaryFile = (path: string) => {
    try {
        fs.existsSync(path) && fs.unlinkSync(path)
    } catch (error) {}
}

export default deleteTemporaryFile

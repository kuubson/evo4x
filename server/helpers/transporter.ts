import nodemailer from 'nodemailer'

const { NODEMAILER_USERNAME, NODEMAILER_PASSWORD } = process.env

export const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: NODEMAILER_USERNAME,
            pass: NODEMAILER_PASSWORD
        }
    },
    {
        from: `"evo4x app" <${NODEMAILER_USERNAME}>`
    }
)

transporter.verify((error, success) => {
    if (error) {
        console.log({
            error,
            message: 'There was a problem connecting to the evo4x email'
        })
    }
    if (success) {
        console.log('The connection with evo4x email has been established')
    }
})

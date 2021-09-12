const baseUrl = req =>
    process.env.NODE_ENV === 'production'
        ? `${req.protocol}://${req.get('host')}`
        : 'http://localhost:3000'

export default baseUrl

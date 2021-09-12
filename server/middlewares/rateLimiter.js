import limiter from 'express-rate-limit'

const rateLimiter = request => {
    return limiter({
        windowMs: 30 * 60 * 1000, // 30 minutes
        max: 10,
        handler: (_, res) => {
            const status = 429
            res.status(status).send({
                error: `You have exceeded ${request} requests. Try again later`,
                status
            })
        }
    })
}

export default rateLimiter

import limiter from 'express-rate-limit'

export const rateLimiter = (request: string) =>
   limiter({
      max: 10,
      windowMs: 30 * 60 * 1000, // 30 minutes
      handler: (_, res) => {
         const status = 429
         res.status(status).send({
            error: `You have exceeded the number of ${request} requests. Try again later`,
            status,
         })
      },
   })

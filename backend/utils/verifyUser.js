import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    // if (!token) return res.status(401).json('login needed')
    if (!token) return next(errorHandler(401, 'access denied'))
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // if (err) return res.status(403).json('token not valid')
        if (err) return next(errorHandler(403, 'token denied'))
        req.user = user
        next()
    })
}
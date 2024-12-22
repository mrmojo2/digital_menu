import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import expressAsyncErrors from 'express-async-errors'
import cookieParser from 'cookie-parser'
import moran from 'morgan'
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload'

import connectDB from './db/connect.js'

import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import { authenticateUser, authorizePermissions } from "./middlewares/atuh.js";


import authRouter from './routes/authRoutes.js'
import usersRouter from './routes/userRoutes.js'


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use(cors(corsOptions)) 
app.use(moran('dev'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileUpload({ useTempFiles: true }))


app.use('/api/v1/auth', authRouter)
//app.use('/api/v1/users',usersRouter)

// app.use('/protectedRoute', authenticateUser, (req, res) => {
//     res.send('this is a protected route')
// })
// app.use('/superProtectedRoute', authenticateUser, authorizePermissions('admin', 'owner'), (req, res) => {
//     res.send('this is a  super protected route only for admins')
// })



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`bababoye server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
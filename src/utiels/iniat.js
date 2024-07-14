import {connectDB} from '../../DataBase/connection.js'
import * as Routers from '../../index.routes.js'
import {globalErrorHandling} from './errhandelr.js'
import cors from 'cors'
export const iniatapp = (app,express)=>{
    const port = process.env.PORT || 8000
    app.use(express.json())
    connectDB()
    app.use(cors())
    app.use('/user',Routers.userRouter)
    app.use('/category',Routers.categoryRouter)
    app.use('/task',Routers.taskRouter)


    app.all('*', (req, res, next) => res.status(404).json({ message: '404 Not Found URL' }), )

    app.use(globalErrorHandling)

}
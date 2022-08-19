
import express from 'express'
import cors from 'cors'
import db from './db/db.js'
import models from './models/models.js'
import errorMiddleware from './middlewares/error.middleware.js'
import router from './routes/index.js'
const port = 8000
const app = express();


app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(port, () => console.log(`Сервер стартовал на http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()




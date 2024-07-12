import express, {Application} from 'express'
import errorHandler from '../middlewares/errorHandler';
import userRouter from '../routes/user/user.router';
import reservationRouter from '../routes/reservation/reservation.router';
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api' , reservationRouter)
app.use(errorHandler)


export default app;

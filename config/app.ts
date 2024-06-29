import express, {Application} from 'express'
import errorHandler from '../middlewares/errorHandler';
import userRouter from '../routes/user/user.router';
import reservationRouter from '../routes/reservation/reservation.router';

const app: Application = express()

app.use(express.json())
app.use(userRouter)
app.use(reservationRouter)
app.use(errorHandler)


export default app;
import express from 'express'
import reservationController from './reservation.controller'

const reservationRouter = express.Router()

reservationRouter.get('/reservations', reservationController.getReservations)
reservationRouter.post('/reservations', reservationController.createReservation)

export default reservationRouter
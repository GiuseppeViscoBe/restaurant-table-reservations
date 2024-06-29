import { NextFunction, Request, Response } from "express";
import reservationModel from "./../../models/reservation.model";
import userModel from "./../../models/user.model";
import {
  createReservationSchema,
  fetchReservationsSchema,
} from "./../../validators/reservation.validator";


//@desc Create new reservation
//@route POST/reservations
//@access public
export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  try {
    const { userId, tableNumber, reservationTime } = createReservationSchema.parse(req.body);

    //è necessario questo controllo ?
    const existingUser = await userModel.getUserById(userId);

    if (!existingUser) {
      const error = new Error("User does not exists");
      res.status(404);
      return next(error);
    }


    //ignorare l'ora nel momento in cui fa il fetch delle prenotazioni ? 
    //validare anche qui la request

    const reservationTimeStartToString = new Date(reservationTime).toISOString()
    const reservationTimeEndToString = new Date(
      new Date(reservationTime).setHours(
        new Date(reservationTime).getHours() + 1
      )
    ).toISOString()

    const reservationsResult = await reservationModel.findReservationsByDateRange(
      reservationTimeStartToString,
      reservationTimeEndToString,
      1,
      10
    );

    const isTableBooked = reservationsResult?.pagedReservations.some(
      (reservation) => reservation.tableNumber === tableNumber
    );

    if (isTableBooked) {
      const error = new Error("Table is already booked for this time slot");
      res.status(404);
      return next(error);
    }

    const reservationTimeParsedToDate = new Date(reservationTime);

    const insertedReservation = reservationModel.createReservation({
      userId,
      tableNumber,
      reservationTime: reservationTimeParsedToDate,
    });

    res.status(201).json(insertedReservation);

  } catch (error: any) {
    next(error)
  }
};

//@desc Get reservations by start date and end date
//@route GET/reservations
//@access public
export const getReservations = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {

    const { start_date, end_date, current_page , items_per_page } = fetchReservationsSchema.parse(req.query);

    
    const reservationsResult = await reservationModel.findReservationsByDateRange(
      start_date,
      end_date,
      current_page,
      items_per_page
    );

    res.status(200).json(reservationsResult);
    //gestire il caso in cui non ci siano prenotazioni per quella data e ora ??
  } catch (error: any) {
    next(error)
  }
};

export default {
  createReservation,
  getReservations,
};

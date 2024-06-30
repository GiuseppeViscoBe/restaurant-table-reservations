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
    const { userEmail, tableNumber, reservationTime } = createReservationSchema.parse(req.body);

    
    const existingUser = await userModel.getUserByEmail(userEmail);

    if (!existingUser) {
      const error = new Error("User does not exists");
      res.status(404);
      return next(error);
    }


    const reservationTimeStartToDate = new Date(reservationTime)
    const reservationTimeEndToDate = new Date(
      new Date(reservationTime).setHours(
        new Date(reservationTime).getHours() + 1
      )
    )

    const reservationsResult = await reservationModel.findReservationsByDateRange(
      reservationTimeStartToDate,
      reservationTimeEndToDate,
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

    const insertedReservation = await reservationModel.createReservation({
      userEmail,
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

    const { reservationDateStart, reservationDateEnd, currentPage , itemsPerPage } = fetchReservationsSchema.parse(req.query);

    const reservationDateStartToDate = new Date(reservationDateStart)
    const reservationDateEndToDate = new Date(reservationDateEnd)

    const reservationsResult = await reservationModel.findReservationsByDateRange(
      reservationDateStartToDate,
      reservationDateEndToDate,
      currentPage,
      itemsPerPage
    );

    res.status(200).json(reservationsResult);
    
  } catch (error: any) {
    next(error)
  }
};

export default {
  createReservation,
  getReservations,
};

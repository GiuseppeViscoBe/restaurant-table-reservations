import { NextFunction, Request, Response } from "express";
import reservationModel from "./../../models/reservation.model";
import {
  createReservationSchema,
  fetchReservationsSchema,
} from "./../../validators/reservation.validator";
import userUtils from "./../../utils/user.utils";
import reservationUtils from "../../utils/reservation.utils";

//@desc Create new reservation
//@route POST/reservations
//@access public
const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // const reservationTimet = req.body.reservationTime;
    
    const { userEmail, tableNumber, reservationTime } = createReservationSchema.parse(req.body);

    await userUtils.checkIfUserDoesNotExists(userEmail);

    const [reservationTimeStartToDate, reservationTimeEndToDate] = reservationUtils.parseAndSetReservationTime(reservationTime);

    console.log(reservationTimeStartToDate)
    console.log(reservationTimeEndToDate)
    
    const reservationsResult = await reservationUtils.getReservationsByDateRange(reservationTimeStartToDate,reservationTimeEndToDate,1,10)


    console.log('reservationsResult')
    console.log(reservationsResult)

    if (reservationsResult) {
      console.log('checking')
      reservationUtils.checkIfTableIsAlreadyBooked(
        reservationsResult?.pagedReservations,
        tableNumber
      );
    }

console.log('test')
    const reservationTimeParsedToDate = new Date(reservationTime);
console.log(reservationTimeParsedToDate)
    const insertedReservation = await reservationModel.createReservation({
      userEmail,
      tableNumber,
      reservationTime: reservationTimeParsedToDate,
    });

    res.status(201).json(insertedReservation);
  } catch (error) {
    next(error);
  }
};

//@desc Get reservations by start date and end date
//@route GET/reservations
//@access public
const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {reservationDateStart, reservationDateEnd, currentPage, itemsPerPage} = fetchReservationsSchema.parse(req.query);

    const reservationDateStartToDate = new Date(reservationDateStart);
    const reservationDateEndToDate = new Date(reservationDateEnd);

    const reservationsResult = await reservationUtils.getReservationsByDateRange(reservationDateStartToDate,reservationDateEndToDate,currentPage,itemsPerPage)

    res.status(200).json(reservationsResult);
  } catch (error: any) {
    next(error);
  }
};

export default {
  createReservation,
  getReservations,
};

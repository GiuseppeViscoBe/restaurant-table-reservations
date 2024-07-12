import { NextFunction, Request, Response } from "express";
import reservationModel from "../../models/reservation.model";
import {
  createReservationSchema,
  fetchReservationsSchema,
} from "../../validators/reservation.validator";
import userUtils from "../../utils/user.utils";
import reservationUtils from "../../utils/reservation.utils";
import { CustomError } from "../../interfaces/error.interface";
import { z } from "zod";

//@desc Create new reservation
//@route POST/reservations
//@access public
const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const { userEmail, tableNumber, reservationTime } = createReservationSchema.parse(req.body);

    await userUtils.checkIfUserDoesNotExists(userEmail);

    const [reservationTimeStartToDate, reservationTimeEndToDate] = reservationUtils.parseAndSetReservationTime(reservationTime);

    const reservationsResult = await reservationUtils.getReservationsByDateRange(reservationTimeStartToDate,reservationTimeEndToDate,1,10)


    if(reservationsResult?.pagedReservations.length === 0){
      const error: CustomError = new Error("There are no reservations for the date inserted");
         error.statusCode = 404;
         throw error;
    }

    const isTableBooked = reservationUtils.checkIfTableIsAlreadyBooked(
      reservationsResult?.pagedReservations,
      tableNumber
    );

    if (isTableBooked) {
      const error: CustomError = new Error("Table is already booked for this time slot");
      error.statusCode = 404;
      throw error;
    }

    const reservationTimeParsedToDate = new Date(reservationTime);

    const insertedReservation = await reservationModel.createReservation({
      userEmail,
      tableNumber,
      reservationTime: reservationTimeParsedToDate,
    });

    res.status(201).json(insertedReservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      console.log(error.errors)
      const errorMessages = error.errors.map(err => err.message).join(', ');
      const errorCustom : CustomError = new Error(errorMessages);
      errorCustom.statusCode = 400;
      // Pass the error messages to the error handler
      next(errorCustom);
    } else {
      // Pass unexpected errors to the error handler
      next(error);
    }
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
  } catch (error : any) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      console.log(error.errors)
      const errorMessages = error.errors.map(err => err.message).join(', ');
      const errorCustom : CustomError = new Error(errorMessages);
      errorCustom.statusCode = 400;
      // Pass the error messages to the error handler
      next(errorCustom);
    } else {
      // Pass unexpected errors to the error handler
      next(error);
    }
  }
};

//@desc Delete Reservation by userEmail, tableNumber and reservationTime
//@route DELETE/reservations
//@access public
const deleteReservation = async (req: Request, res : Response, next : NextFunction) : Promise<void> => {
  
  try {
    const {userEmail , tableNumber, reservationTime}  = req.body

    const [reservationTimeStartToDate, reservationTimeEndToDate] = reservationUtils.parseAndSetReservationTime(reservationTime);
    
     const reservationsResult = await reservationUtils.getReservationsByDateRangeTableNumber(reservationTimeStartToDate,reservationTimeEndToDate,tableNumber,1,10)
 
     if (!reservationsResult?.pagedReservations.length) {
         const error: CustomError = new Error("There are no reservations for this time");
         error.statusCode = 404;
         throw error;
       }
 
      const deletionResult = await reservationModel.deleteReservation(reservationTimeStartToDate, userEmail, tableNumber)
     
       if(deletionResult.numDeletedRows < 1){
         const error: CustomError = new Error("There was an error deleting your reservation");
         error.statusCode = 404;
         throw error;
       }
       res.status(200).json(deletionResult.numDeletedRows)
  } catch (error) {
    next(error)
  }
}

export default {
  createReservation,
  getReservations,
  deleteReservation
};

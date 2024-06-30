import { CustomError } from "../interfaces/error.interface";
import { PaginatedReservations, Reservation } from "../interfaces/reservation.interface";
import reservationModel from "../models/reservation.model";

const parseAndSetReservationTime = (reservationTime: string): [Date, Date] => {
    const reservationTimeStartToDate = new Date(reservationTime);
    const reservationTimeEndToDate = new Date(
      new Date(reservationTime).setMinutes(new Date(reservationTime).getMinutes() + 59)
    );

    console.log('start: ' + reservationTimeStartToDate)
    console.log('end: ' + reservationTimeEndToDate)
    return [reservationTimeStartToDate, reservationTimeEndToDate];
  };
  
  const checkIfTableIsAlreadyBooked = (
    reservations: Reservation[],
    tableNumber: number
  ): void => {
    const isTableBooked = reservations.some((reservation) => reservation.tableNumber === tableNumber);
  
    console.log(isTableBooked)
    if (isTableBooked) {
      const error: CustomError = new Error("Table is already booked for this time slot");
      error.statusCode = 404;
      throw error;
    }
  };

  export const getReservationsByDateRange = async (
    reservationDateStart: Date,
    reservationDateEnd: Date,
    currentPage: number,
    itemsPerPage: number
  ): Promise<PaginatedReservations | undefined> => {
  
    const reservationsResult = await reservationModel.findReservationsByDateRange(
      reservationDateStart,
      reservationDateEnd,
      currentPage,
      itemsPerPage
    );
  
    return reservationsResult;
  };

  export default {
    parseAndSetReservationTime,
    checkIfTableIsAlreadyBooked,
    getReservationsByDateRange
  }
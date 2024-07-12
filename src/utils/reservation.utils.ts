import { CustomError } from "../interfaces/error.interface";
import { PaginatedReservations, Reservation } from "../interfaces/reservation.interface";
import reservationModel from "../models/reservation.model";

const parseAndSetReservationTime = (reservationTime: string): [Date, Date] => {
    const reservationTimeStartToDate = new Date(reservationTime);
    const reservationTimeEndToDate = new Date(
      new Date(reservationTime).setUTCMinutes(new Date(reservationTime).getUTCMinutes() + 59)
    );

    return [reservationTimeStartToDate, reservationTimeEndToDate];
  };
  
  const checkIfTableIsAlreadyBooked = (
    reservations: Reservation[] | undefined,
    tableNumber: number
  ): boolean | undefined => {

    return reservations?.some((reservation) => reservation.tableNumber === tableNumber);
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

  export const getReservationsByDateRangeTableNumber = async (
    reservationDateStart: Date,
    reservationDateEnd: Date,
    tableNumber : number,
    currentPage: number,
    itemsPerPage: number
  ): Promise<PaginatedReservations | undefined> => {
  
    const reservationsResult = await reservationModel.findReservationsByDateRangeTableNumber(
      reservationDateStart,
      reservationDateEnd,
      tableNumber,
      currentPage,
      itemsPerPage
    );
  
    return reservationsResult;
  };

  export default {
    parseAndSetReservationTime,
    checkIfTableIsAlreadyBooked,
    getReservationsByDateRange,
    getReservationsByDateRangeTableNumber
  }
import { db } from "../config/database";
import { Reservation, PaginatedReservations } from "../interfaces/reservation.interface";

const createReservation = async (reservation: Reservation) : Promise<Reservation | undefined>   => {
  const insertedReservationResult = await db
    .insertInto("reservations")
    .values(reservation)
    .executeTakeFirstOrThrow();

  const createdReservation = await getReservationById(
    insertedReservationResult.insertId
  );

  return createdReservation;
};

const getReservationById = async (id: any) : Promise<Reservation | undefined>  => {
  const resultReservation = await db
    .selectFrom("reservations")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

    return resultReservation
};

const findReservationsByDateRange = async (
  startDate: Date,
  endDate: Date,
  currentPage: number,
  itemsPerPage: number
) : Promise<PaginatedReservations | undefined> => {
  const offset = (currentPage - 1) * itemsPerPage;

  const pagedReservations = await db
    .selectFrom("reservations")
    .selectAll()
    .limit(itemsPerPage)
    .offset(offset)
    .where("reservationTime", ">=", startDate)
    .where("reservationTime", "<=", endDate)
    .execute();

  const reservationsCount = await db
    .selectFrom("reservations")
    .select(db.fn.count("id").as("count"))
    .executeTakeFirst();

  const totalPages = Math.ceil(Number(reservationsCount?.count) / itemsPerPage);

  return {
    pagedReservations,
    totalPages,
    currentPage,
  };
};

export default {
  createReservation,
  findReservationsByDateRange,
};


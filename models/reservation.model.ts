import { db } from "../config/database";

interface Reservation {
  id?: number;
  userId: number;
  tableNumber: number;
  reservationTime: Date;
}

const createReservation = async (reservation: Reservation) => {
  const insertedReservationResult = await db
    .insertInto("reservations")
    .values(reservation)
    .executeTakeFirstOrThrow();

  console.log(insertedReservationResult.insertId);
  const createdReservation = await getReservationById(
    insertedReservationResult.insertId
  );

  return createdReservation;
};

const getReservationById = async (id: any) => {
  return await db
    .selectFrom("reservations")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

const findReservationsByDateRange = async (
  startDate: string,
  endDate: string,
  currentPage: number,
  itemsPerPage: number
) => {
  const start = new Date(startDate).toISOString();
  const end = new Date(endDate).toISOString();
  const offset = (currentPage - 1) * itemsPerPage;

  console.log("Start Date:", start);
  console.log("End Date:", end);

  const pagedReservations = await db
    .selectFrom("reservations")
    .selectAll()
    .limit(itemsPerPage)
    .offset(offset)
    .where("reservationTime", ">=", new Date(startDate))
    .where("reservationTime", "<=", new Date(endDate))
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


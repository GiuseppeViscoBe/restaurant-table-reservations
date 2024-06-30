import { z } from "zod";

export const createReservationSchema = z.object({
  userEmail: z
    .string()
    .min(1, { message: "Email must not be empty" })
    .email({ message: "Email format not valid" }),
  tableNumber: z
    .number()
    .min(1, { message: "Table number must be at least 1" })
    .max(5, { message: "Table number must be at most 5" }),
  reservationTime: z
    .string()
    .datetime({ message: "Reservation time must be a valid datetime string" })
    .refine(
      (time) => {
        const date = new Date(time);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const isValidTime = !isNaN(date.getTime()) && (hours >= 19 && (hours < 23 || (hours === 23 && minutes === 0)));


        return isValidTime;
      },
      {
        message: "Reservation time must be between 19:00 and 23:00",
      }
    ),
});

export const fetchReservationsSchema = z.object({
  reservationDateStart: z
    .string()
    .datetime({
      message: "Start date for reservation must be a valid datetime string",
    }),
  reservationDateEnd: z
    .string()
    .datetime({
      message: "End date for reservation must be a valid datetime string",
    }),
  currentPage: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("1")
    .refine((val) => !isNaN(val), { message: "Current page must be a number" }),
  itemsPerPage: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("10")
    .refine((val) => !isNaN(val), {
      message: "Items per page must be a number",
    }),
});

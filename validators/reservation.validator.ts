import { z } from "zod";

export const createReservationSchema = z.object({
  userId: z.number(),
  tableNumber: z.number().min(1).max(5),
  reservationTime: z
    .string()
    .datetime()
    .refine(
      (time) => {
        const date = new Date(time);
        console.log(date);
        return (
          !isNaN(date.getTime()) &&
          date.getHours() >= 19 &&
          date.getHours() < 24
        );
      },
      {
        message: "Reservation time must be between 19:00 and 24:00",
      }
    ),
});


export const fetchReservationsSchema = z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  current_page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("1"),
  items_per_page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("10"),
});

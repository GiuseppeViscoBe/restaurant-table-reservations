"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchReservationsSchema = exports.createReservationSchema = void 0;
const zod_1 = require("zod");
exports.createReservationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    tableNumber: zod_1.z.number().min(1).max(5),
    reservationTime: zod_1.z
        .string()
        .datetime()
        .refine((time) => {
        const date = new Date(time);
        console.log(date);
        return (!isNaN(date.getTime()) &&
            date.getHours() >= 19 &&
            date.getHours() < 24);
    }, {
        message: "Reservation time must be between 19:00 and 24:00",
    }),
});
exports.fetchReservationsSchema = zod_1.z.object({
    start_date: zod_1.z.string().datetime(),
    end_date: zod_1.z.string().datetime(),
    current_page: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .default("1"),
    items_per_page: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .default("10"),
});

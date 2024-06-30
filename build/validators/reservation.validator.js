"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchReservationsSchema = exports.createReservationSchema = void 0;
const zod_1 = require("zod");
exports.createReservationSchema = zod_1.z.object({
    userEmail: zod_1.z
        .string()
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Email format not valid" }),
    tableNumber: zod_1.z
        .number()
        .min(1, { message: "Table number must be at least 1" })
        .max(5, { message: "Table number must be at most 5" }),
    reservationTime: zod_1.z
        .string()
        .datetime({ message: "Reservation time must be a valid datetime string" })
        .refine((time) => {
        const date = new Date(time);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const isValidTime = !isNaN(date.getTime()) && (hours >= 19 && (hours < 23 || (hours === 23 && minutes === 0)));
        return isValidTime;
    }, {
        message: "Reservation time must be between 19:00 and 23:00",
    }),
});
exports.fetchReservationsSchema = zod_1.z.object({
    reservationDateStart: zod_1.z
        .string()
        .datetime({
        message: "Start date for reservation must be a valid datetime string",
    }),
    reservationDateEnd: zod_1.z
        .string()
        .datetime({
        message: "End date for reservation must be a valid datetime string",
    }),
    currentPage: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .default("1")
        .refine((val) => !isNaN(val), { message: "Current page must be a number" }),
    itemsPerPage: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .default("10")
        .refine((val) => !isNaN(val), {
        message: "Items per page must be a number",
    }),
});

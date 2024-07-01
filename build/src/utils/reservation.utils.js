"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationsByDateRange = void 0;
const reservation_model_1 = __importDefault(require("../models/reservation.model"));
const parseAndSetReservationTime = (reservationTime) => {
    const reservationTimeStartToDate = new Date(reservationTime);
    const reservationTimeEndToDate = new Date(new Date(reservationTime).setUTCMinutes(new Date(reservationTime).getUTCMinutes() + 59));
    return [reservationTimeStartToDate, reservationTimeEndToDate];
};
const checkIfTableIsAlreadyBooked = (reservations, tableNumber) => {
    const isTableBooked = reservations.some((reservation) => reservation.tableNumber === tableNumber);
    if (isTableBooked) {
        const error = new Error("Table is already booked for this time slot");
        error.statusCode = 404;
        throw error;
    }
};
const getReservationsByDateRange = (reservationDateStart, reservationDateEnd, currentPage, itemsPerPage) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationsResult = yield reservation_model_1.default.findReservationsByDateRange(reservationDateStart, reservationDateEnd, currentPage, itemsPerPage);
    return reservationsResult;
});
exports.getReservationsByDateRange = getReservationsByDateRange;
exports.default = {
    parseAndSetReservationTime,
    checkIfTableIsAlreadyBooked,
    getReservationsByDateRange: exports.getReservationsByDateRange
};

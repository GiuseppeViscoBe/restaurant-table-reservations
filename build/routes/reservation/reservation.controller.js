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
exports.getReservations = exports.createReservation = void 0;
const reservation_model_1 = __importDefault(require("./../../models/reservation.model"));
const user_model_1 = __importDefault(require("./../../models/user.model"));
const reservation_validator_1 = require("./../../validators/reservation.validator");
//@desc Create new reservation
//@route POST/reservations
//@access public
const createReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, tableNumber, reservationTime } = reservation_validator_1.createReservationSchema.parse(req.body);
        const existingUser = yield user_model_1.default.getUserByEmail(userEmail);
        if (!existingUser) {
            const error = new Error("User does not exists");
            res.status(404);
            return next(error);
        }
        const reservationTimeStartToDate = new Date(reservationTime);
        const reservationTimeEndToDate = new Date(new Date(reservationTime).setHours(new Date(reservationTime).getHours() + 1));
        const reservationsResult = yield reservation_model_1.default.findReservationsByDateRange(reservationTimeStartToDate, reservationTimeEndToDate, 1, 10);
        const isTableBooked = reservationsResult === null || reservationsResult === void 0 ? void 0 : reservationsResult.pagedReservations.some((reservation) => reservation.tableNumber === tableNumber);
        if (isTableBooked) {
            const error = new Error("Table is already booked for this time slot");
            res.status(404);
            return next(error);
        }
        const reservationTimeParsedToDate = new Date(reservationTime);
        const insertedReservation = yield reservation_model_1.default.createReservation({
            userEmail,
            tableNumber,
            reservationTime: reservationTimeParsedToDate,
        });
        res.status(201).json(insertedReservation);
    }
    catch (error) {
        next(error);
    }
});
exports.createReservation = createReservation;
//@desc Get reservations by start date and end date
//@route GET/reservations
//@access public
const getReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationDateStart, reservationDateEnd, currentPage, itemsPerPage } = reservation_validator_1.fetchReservationsSchema.parse(req.query);
        const reservationDateStartToDate = new Date(reservationDateStart);
        const reservationDateEndToDate = new Date(reservationDateEnd);
        const reservationsResult = yield reservation_model_1.default.findReservationsByDateRange(reservationDateStartToDate, reservationDateEndToDate, currentPage, itemsPerPage);
        res.status(200).json(reservationsResult);
    }
    catch (error) {
        next(error);
    }
});
exports.getReservations = getReservations;
exports.default = {
    createReservation: exports.createReservation,
    getReservations: exports.getReservations,
};

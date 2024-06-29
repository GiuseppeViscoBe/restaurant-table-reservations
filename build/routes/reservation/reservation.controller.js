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
        const { userId, tableNumber, reservationTime } = reservation_validator_1.createReservationSchema.parse(req.body);
        //è necessario questo controllo ?
        const existingUser = yield user_model_1.default.getUserById(userId);
        if (!existingUser) {
            const error = new Error("User does not exists");
            res.status(404);
            return next(error);
        }
        //ignorare l'ora nel momento in cui fa il fetch delle prenotazioni ? 
        //validare anche qui la request
        const reservationTimeStartToString = new Date(reservationTime).toISOString();
        const reservationTimeEndToString = new Date(new Date(reservationTime).setHours(new Date(reservationTime).getHours() + 1)).toISOString();
        const reservationsResult = yield reservation_model_1.default.findReservationsByDateRange(reservationTimeStartToString, reservationTimeEndToString, 1, 10);
        const isTableBooked = reservationsResult.pagedReservations.some((reservation) => reservation.tableNumber === tableNumber);
        if (isTableBooked) {
            const error = new Error("Table is already booked for this time slot");
            res.status(404);
            return next(error);
        }
        const reservationTimeParsedToDate = new Date(reservationTime);
        const insertedReservation = reservation_model_1.default.createReservation({
            userId,
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
        const { start_date, end_date, current_page, items_per_page } = reservation_validator_1.fetchReservationsSchema.parse(req.query);
        const reservationsResult = yield reservation_model_1.default.findReservationsByDateRange(start_date, end_date, current_page, items_per_page);
        res.status(200).json(reservationsResult);
        //gestire il caso in cui non ci siano prenotazioni per quella data e ora ??
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

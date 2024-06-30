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
const reservation_model_1 = __importDefault(require("./../../models/reservation.model"));
const reservation_validator_1 = require("./../../validators/reservation.validator");
const user_utils_1 = __importDefault(require("./../../utils/user.utils"));
const reservation_utils_1 = __importDefault(require("../../utils/reservation.utils"));
//@desc Create new reservation
//@route POST/reservations
//@access public
const createReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const reservationTimet = req.body.reservationTime;
        const { userEmail, tableNumber, reservationTime } = reservation_validator_1.createReservationSchema.parse(req.body);
        yield user_utils_1.default.checkIfUserDoesNotExists(userEmail);
        const [reservationTimeStartToDate, reservationTimeEndToDate] = reservation_utils_1.default.parseAndSetReservationTime(reservationTime);
        console.log(reservationTimeStartToDate);
        console.log(reservationTimeEndToDate);
        const reservationsResult = yield reservation_utils_1.default.getReservationsByDateRange(reservationTimeStartToDate, reservationTimeEndToDate, 1, 10);
        console.log('reservationsResult');
        console.log(reservationsResult);
        if (reservationsResult) {
            console.log('checking');
            reservation_utils_1.default.checkIfTableIsAlreadyBooked(reservationsResult === null || reservationsResult === void 0 ? void 0 : reservationsResult.pagedReservations, tableNumber);
        }
        console.log('test');
        const reservationTimeParsedToDate = new Date(reservationTime);
        console.log(reservationTimeParsedToDate);
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
//@desc Get reservations by start date and end date
//@route GET/reservations
//@access public
const getReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationDateStart, reservationDateEnd, currentPage, itemsPerPage } = reservation_validator_1.fetchReservationsSchema.parse(req.query);
        const reservationDateStartToDate = new Date(reservationDateStart);
        const reservationDateEndToDate = new Date(reservationDateEnd);
        const reservationsResult = yield reservation_utils_1.default.getReservationsByDateRange(reservationDateStartToDate, reservationDateEndToDate, currentPage, itemsPerPage);
        res.status(200).json(reservationsResult);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    createReservation,
    getReservations,
};

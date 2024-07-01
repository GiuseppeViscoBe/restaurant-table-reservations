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
const reservation_controller_1 = __importDefault(require("./../routes/reservation/reservation.controller"));
const reservation_model_1 = __importDefault(require("../models/reservation.model"));
const user_utils_1 = __importDefault(require("../utils/user.utils"));
const reservation_utils_1 = __importDefault(require("../utils/reservation.utils"));
jest.mock('../models/reservation.model');
jest.mock('../utils/user.utils');
jest.mock('../utils/reservation.utils');
describe('Reservation Controller', () => {
    let req;
    let res;
    let next = jest.fn();
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    describe('createReservation', () => {
        it('should create a new reservation', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                userEmail: 'test@example.com',
                tableNumber: 3,
                reservationTime: '2024-06-30T22:00:00Z',
            };
            user_utils_1.default.checkIfUserDoesNotExists.mockResolvedValueOnce(undefined);
            reservation_utils_1.default.getReservationsByDateRange.mockResolvedValueOnce([]);
            reservation_model_1.default.createReservation.mockResolvedValueOnce(Object.assign({ id: 1 }, req.body));
            yield reservation_controller_1.default.createReservation(req, res, next);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(Object.assign({ id: 1 }, req.body));
        }));
        it('should handle user not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                userEmail: 'nonexistent@example.com',
                tableNumber: 3,
                reservationTime: '2024-06-30T22:00:00Z',
            };
            const error = new Error('User does not exists');
            error.statusCode = 404;
            user_utils_1.default.checkIfUserDoesNotExists.mockRejectedValueOnce(error);
            yield reservation_controller_1.default.createReservation(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        }));
        // Aggiungi altri test per i vari scenari del metodo createReservation...
    });
    describe('getReservations', () => {
        it('should get a list of reservations', () => __awaiter(void 0, void 0, void 0, function* () {
            req.query = {
                reservationDateStart: '2024-06-01T00:00:00Z',
                reservationDateEnd: '2024-06-30T23:59:59Z',
                currentPage: '1',
                itemsPerPage: '10',
            };
            const reservations = [
                { id: 1, userEmail: 'test1@example.com', tableNumber: 1, reservationTime: '2024-06-10T19:00:00Z' },
                { id: 2, userEmail: 'test2@example.com', tableNumber: 2, reservationTime: '2024-06-15T20:00:00Z' },
            ];
            reservation_utils_1.default.getReservationsByDateRange.mockResolvedValueOnce(reservations);
            yield reservation_controller_1.default.getReservations(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(reservations);
        }));
        // Aggiungi altri test per i vari scenari del metodo getReservations...
    });
});

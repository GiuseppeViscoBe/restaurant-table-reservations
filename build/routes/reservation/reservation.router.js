"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = __importDefault(require("./reservation.controller"));
const reservationRouter = express_1.default.Router();
reservationRouter.get('/reservations', reservation_controller_1.default.getReservations);
reservationRouter.post('/reservations', reservation_controller_1.default.createReservation);
exports.default = reservationRouter;

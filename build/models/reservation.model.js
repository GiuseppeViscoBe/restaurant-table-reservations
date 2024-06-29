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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const createReservation = (reservation) => __awaiter(void 0, void 0, void 0, function* () {
    const insertedReservationResult = yield database_1.db
        .insertInto("reservations")
        .values(reservation)
        .executeTakeFirstOrThrow();
    const createdReservation = yield getReservationById(insertedReservationResult.insertId);
    return createdReservation;
});
const getReservationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resultReservation = yield database_1.db
        .selectFrom("reservations")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
    return resultReservation;
});
const findReservationsByDateRange = (startDate, endDate, currentPage, itemsPerPage) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();
    const offset = (currentPage - 1) * itemsPerPage;
    console.log("Start Date:", start);
    console.log("End Date:", end);
    const pagedReservations = yield database_1.db
        .selectFrom("reservations")
        .selectAll()
        .limit(itemsPerPage)
        .offset(offset)
        .where("reservationTime", ">=", new Date(startDate))
        .where("reservationTime", "<=", new Date(endDate))
        .execute();
    const reservationsCount = yield database_1.db
        .selectFrom("reservations")
        .select(database_1.db.fn.count("id").as("count"))
        .executeTakeFirst();
    const totalPages = Math.ceil(Number(reservationsCount === null || reservationsCount === void 0 ? void 0 : reservationsCount.count) / itemsPerPage);
    return {
        pagedReservations,
        totalPages,
        currentPage,
    };
});
exports.default = {
    createReservation,
    findReservationsByDateRange,
};

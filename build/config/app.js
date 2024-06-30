"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const user_router_1 = __importDefault(require("../routes/user/user.router"));
const reservation_router_1 = __importDefault(require("../routes/reservation/reservation.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', user_router_1.default);
app.use('/api', reservation_router_1.default);
app.use(errorHandler_1.default);
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getErrorMessages = (error) => {
    return error.errors.map((err) => err.message).join(", ");
};
exports.default = getErrorMessages;

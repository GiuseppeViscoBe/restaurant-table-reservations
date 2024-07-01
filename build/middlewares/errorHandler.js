"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const environment = process.env.ENVIRONMENT;
    switch (statusCode) {
        case constants_1.errorConstants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
        case constants_1.errorConstants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
        case constants_1.errorConstants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
        case constants_1.errorConstants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
        case constants_1.errorConstants.CONFLICT:
            res.json({
                title: "Conflict",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
        default:
            res.json({
                title: "Generic Error",
                message: err.message,
                stackTrace: environment == 'development' ? err.stack : '',
            });
            break;
    }
};
exports.default = errorHandler;

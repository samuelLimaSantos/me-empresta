"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authConfig_1 = require("../config/authConfig");
var GenerateTokenJWT = /** @class */ (function () {
    function GenerateTokenJWT() {
    }
    GenerateTokenJWT.prototype.execute = function (id) {
        var expiresIn = authConfig_1.default.jwt.expiresIn;
        var secret = process.env.SECRET;
        var token = jsonwebtoken_1.sign({
            id: id,
        }, secret, {
            subject: String(id),
            expiresIn: expiresIn
        });
        return token;
    };
    return GenerateTokenJWT;
}());
exports.default = GenerateTokenJWT;
//# sourceMappingURL=generateTokenJWT.js.map
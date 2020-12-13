"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = require("./user.routes");
var session_routes_1 = require("./session.routes");
var routes = express_1.Router();
routes.use('/user', user_routes_1.default);
routes.use('/session', session_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map
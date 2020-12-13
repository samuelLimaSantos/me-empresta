"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sessionController_1 = require("../controllers/sessionController");
var routes = express_1.Router();
var sessionController = new sessionController_1.default();
routes.post('/', sessionController.createSession);
exports.default = routes;
//# sourceMappingURL=session.routes.js.map
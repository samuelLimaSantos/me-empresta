"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var userController_1 = require("../controllers/userController");
var multer_1 = require("../config/multer");
var upload = multer(multer_1.default);
var routes = express_1.Router();
var userController = new userController_1.default();
routes.post('/', upload.single('photo'), userController.create);
routes.get('/', function (request, response) {
    return response.json({ message: 'esperance' });
});
exports.default = routes;
//# sourceMappingURL=user.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var path = require("path");
var crypto = require("crypto");
exports.default = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (request, file, callback) {
            var hash = crypto.randomBytes(6).toString('hex');
            var fileName = hash + "-" + file.originalname;
            callback(null, fileName);
        },
    }),
};
//# sourceMappingURL=multer.js.map
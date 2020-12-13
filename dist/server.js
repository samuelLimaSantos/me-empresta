"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require('cors');
var routes_1 = require("./routes");
var dotenv = require("dotenv");
require("./database");
require("reflect-metadata");
var app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes_1.default);
var port = 3333;
app.listen(process.env.PORT || port, function () {
    console.log("Project is running at port " + port + "\uD83D\uDE08\uD83D\uDE08!");
});
//# sourceMappingURL=server.js.map
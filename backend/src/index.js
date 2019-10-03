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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var helmet = require('helmet');
require('dotenv').config({ path: '.env' });
var createServer = require('./createServer');
var db = require('./db');
var server = createServer();
server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(cookieParser());
var FRONTEND_URL = process.env.NODE_ENV !== 'development' ? process.env.FRONTEND_URL : process.env.LOCAL_HOST;
console.log("FRONTEND_URL: " + FRONTEND_URL);
server.express.use(cors({ credentials: true, origin: FRONTEND_URL }));
var helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
        },
    },
};
server.express.use(helmet());
// Decode JWT and pass it to each request
server.express.use(function (req, res, next) {
    var token = req.cookies.token;
    if (token) {
        var userId = jwt.verify(token, process.env.APP_SECRET).userId;
        req.userId = userId;
    }
    next();
});
// Populate the user on each request
server.express.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.userId)
                    return [2 /*return*/, next()];
                return [4 /*yield*/, db.query.user({ where: { id: req.userId } }, '{ id, email, name, permissions, goal, subscription }')];
            case 1:
                user = _a.sent();
                req.user = user;
                next();
                return [2 /*return*/];
        }
    });
}); });
var options = {
//   port: 8000,
//   endpoint: '/graphql',
//   subscriptions: '/subscriptions',
//   playground: '/playground',
//   cors: false, // disable apollo server cors
};
server.start({ cors: false }, // disable apollo server cors
function (// disable apollo server cors
deets) {
    console.log("\uD83D\uDE80 Server is now running on port http://localhost:" + deets.port);
});

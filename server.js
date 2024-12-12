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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var path = require("path");
var client_1 = require("@prisma/client");
var crypto_1 = require("crypto");
var axios = require("axios");
var dotenv = require("dotenv");
dotenv.config();
// Setup
var app = express();
var prisma = new client_1.PrismaClient();
// CORS Configuration: Allow requests from your frontend domain
var corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? "https://www.redranger.me"
        : "*", // Allow all origins during development
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};
app.use(cors(corsOptions)); // Apply CORS with options
app.use(express.json()); // Parse JSON
// Rangers
var rangers = {
    "SPD": ["0.1.jpg", "0.2.jpg", "0.3.jpg", "0.4.jpg", "0.5.jpg"],
    "NINJA STORM": ["1.1.jpg", "1.2.jpg", "1.3.jpg", "1.4.jpg", "1.5.jpg", "1.6.jpg", "1.7.jpg"],
    "DINO THUNDER": ["2.1.jpg", "2.2.jpg", "2.3.jpg", "2.4.jpg", "2.5.jpg"],
    "MEGAFORCE": ["3.1.jpg", "3.2.jpg", "3.3.jpg", "3.4.jpg", "3.5.jpg"],
    "DINO FURY": ["4.1.jpg", "4.2.jpg", "4.3.jpg"],
    "NINJA STEEL": ["5.1.jpg", "5.2.jpg", "5.3.jpg"],
    "DINO CHARGE": ["6.1.jpg", "6.2.jpg", "6.3.jpg", "6.4.jpg", "6.5.jpg"],
    "SAMURAI": ["7.1.jpg", "7.2.jpg", "7.3.jpg", "7.4.jpg", "7.5.jpg"],
    "JUNGLE FURY": ["8.1.jpg", "8.2.jpg", "8.3.jpg", "8.4.jpg"],
    "MYSTIC FORCE": ["9.1.jpg", "9.2.jpg", "9.3.jpg", "9.4.jpg"],
};
// Function to hash user identifier and map to an image
function getHashForUser(identifier) {
    return (0, crypto_1.createHash)("md5").update(identifier).digest("hex");
}
// Function to check if user has an assigned ranger in the database
function getAssignedRanger(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { id: userId },
                            select: { rangerClass: true, rangerImage: true }
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        console.log("User not found in database");
                        return [2 /*return*/, null];
                    }
                    console.log("User found: ", user);
                    return [2 /*return*/, user];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching assigned ranger:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to assign a ranger to the user
function assignRanger(userId, userHash) {
    return __awaiter(this, void 0, void 0, function () {
        var allRangers, randomIndex, randomRanger, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    allRangers = Object.entries(rangers).flatMap(function (_a) {
                        var rangerClass = _a[0], images = _a[1];
                        return images.map(function (image) { return ({ class: rangerClass, image: image }); });
                    });
                    randomIndex = parseInt(userHash.slice(0, 8), 16) % allRangers.length;
                    randomRanger = allRangers[randomIndex];
                    console.log("Assigning ranger:", { userId: userId, userHash: userHash }); // Log when assigning the ranger
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: userId },
                            data: {
                                rangerClass: randomRanger.class,
                                rangerImage: randomRanger.image
                            }
                        })];
                case 1:
                    _a.sent();
                    console.log("Ranger assigned: ".concat(randomRanger.class, " - ").concat(randomRanger.image));
                    return [2 /*return*/, { rangerClass: randomRanger.class, rangerImage: randomRanger.image }];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error assigning ranger:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Static
app.use("/rangers", express.static(path.join(__dirname, "public/rangers")));
// Kinde API URL
var KIND_API_URL = "https://rangers.kinde.com/api/users";
function fetchUserDetailsFromKinde(userIdentifier) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("KINDE_ACCESS_TOKEN:", process.env.KINDE_ACCESS_TOKEN); // Log Kinde token
                    console.log("NODE_ENV:", process.env.NODE_ENV); // Log environment
                    return [4 /*yield*/, axios.get(KIND_API_URL, {
                            headers: {
                                Authorization: "Bearer ".concat(process.env.KINDE_ACCESS_TOKEN),
                            },
                            params: { userIdentifier: userIdentifier },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        console.error("Error fetching user details from Kinde:", error_3.message);
                    }
                    else {
                        console.error("Error fetching user details from Kinde:", error_3);
                    }
                    throw new Error("Failed to fetch user details from Kinde");
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Fetch user details from X API
function fetchUserDetailsFromXAPI(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Fetching user details for username: ".concat(username));
                    return [4 /*yield*/, axios.get("https://xapi.com/user?username=".concat(username), {
                            headers: {
                                'Authorization': "Bearer ".concat(process.env.X_API_KEY), // or use 'X-API-KEY': process.env.X_API_KEY
                                'X-API-SECRET': process.env.X_API_SECRET
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log("Response from X API:", response.data);
                    return [2 /*return*/, response.data];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error fetching user details from X API:", error_4.response ? error_4.response.data : error_4.message);
                    throw new Error("Failed to fetch user details from X API");
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Assign Ranger API
app.get("/assign-ranger", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, userDetails, user, ranger, userHash, rangerImageUrl, error_5, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                userName = req.query.userName || "";
                console.log("Assigning ranger to user: ".concat(userName));
                return [4 /*yield*/, fetchUserDetailsFromXAPI(userName)];
            case 1:
                userDetails = _a.sent();
                console.log("User details from X API:", userDetails);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { username: userDetails.username }
                    })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: userDetails.username,
                            imageUrl: userDetails.imageUrl,
                            name: userDetails.name
                        }
                    })];
            case 3:
                // Create new user in the database
                user = _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, getAssignedRanger(user.id)];
            case 5:
                ranger = _a.sent();
                if (!!ranger) return [3 /*break*/, 7];
                userHash = getHashForUser(userName);
                console.log("User hash:", userHash);
                return [4 /*yield*/, assignRanger(user.id, userHash)];
            case 6:
                ranger = _a.sent();
                _a.label = 7;
            case 7:
                console.log("Ranger assigned:", ranger);
                if (!ranger) {
                    return [2 /*return*/, res.status(500).json({ message: "Failed to assign Ranger" })];
                }
                rangerImageUrl = "/rangers/".concat(ranger.rangerImage);
                res.json({ rangerImageUrl: rangerImageUrl, rangerClass: ranger.rangerClass, username: user.username, imageUrl: user.imageUrl });
                return [3 /*break*/, 9];
            case 8:
                error_5 = _a.sent();
                console.error("Error in /assign-ranger API:", error_5);
                errorMessage = error_5 instanceof Error ? error_5.message : "Unknown error";
                res.status(500).json({ message: "Failed to assign Ranger", error: errorMessage });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
// Listen
var port = process.env.PORT || 3012;
app.listen(port, function () { return console.log("Server at http://localhost:".concat(port)); });

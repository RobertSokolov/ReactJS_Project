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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const book = req.body.book;
    const userReq = req;
    console.log(book);
    const user = yield User_1.default.findById((_a = userReq.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const alreadyExists = user.favorites.some(fav => fav.keyProp === book.keyProp);
    if (!alreadyExists) {
        user.favorites.push(book);
        yield user.save();
    }
    res.json({ favorites: user.favorites });
}));
router.delete("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { keyProp } = req.body;
    const userReq = req;
    const user = yield User_1.default.findById((_a = userReq.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    user.favorites = user.favorites.filter(book => book.keyProp !== keyProp);
    yield user.save();
    res.json({ favorites: user.favorites });
}));
router.get("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userReq = req;
    const user = yield User_1.default.findById((_a = userReq.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ favorites: user.favorites });
}));
exports.default = router;

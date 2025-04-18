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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Register 
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new User_1.default({
        username,
        email,
        password: hashedPassword,
    });
    try {
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, Buffer.from((_a = process.env.JWT_Secret) !== null && _a !== void 0 ? _a : "null"), { expiresIn: '6h' });
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordCheck) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, Buffer.from((_a = process.env.JWT_Secret) !== null && _a !== void 0 ? _a : "null"), { expiresIn: "6h" });
    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
        }
    });
}));
exports.default = router;

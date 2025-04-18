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
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
// Cache Entries for favorites
const cache = new Map();
router.post("/work", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workId } = req.body;
    console.log(workId);
    if (typeof workId !== "string" || workId.trim() === "") {
        return res.status(400).json({ message: "workId must be a non-empty string" });
    }
    try {
        if (cache.has(workId)) {
            console.log(`Cache hit: ${workId}`);
            return res.json({ work: cache.get(workId) });
        }
        console.log(`Fetching: ${workId}`);
        const response = yield (0, node_fetch_1.default)(`https://openlibrary.org/works/${workId}.json`);
        if (!response.ok)
            throw new Error(`Failed to fetch ${workId}`);
        const data = yield response.json();
        cache.set(workId, data);
        res.json({ work: data });
    }
    catch (error) {
        console.error("OpenLibrary fetch error:", error);
        res.status(500).json({ message: "Failed to fetch work data" });
    }
}));
router.get('/subject/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    const url = `http://openlibrary.org/subjects/${name}.json?limit=${limit}&offset=${offset}`;
    try {
        const response = yield (0, node_fetch_1.default)(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed To Fetch from Open Library' });
        }
        const data = yield response.json();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: "DDInternal server error", err });
    }
}));
exports.default = router;

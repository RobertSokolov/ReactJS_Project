"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const favoritesRoutes_1 = __importDefault(require("./routes/favoritesRoutes"));
const openlibraryRoutes_1 = __importDefault(require("./routes/openlibraryRoutes"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.DB_STRING || "null")
    .then(() => {
    console.log("Connnected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/openlibrary", openlibraryRoutes_1.default);
app.use("/api/favorites", favoritesRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server Started at port: ${PORT}`);
});

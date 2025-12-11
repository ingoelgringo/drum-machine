"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new pg_1.default.Client({
    connectionString: process.env.PGURI,
});
client.connect();
app.get("/api/player", async (_request, response) => {
    const { rows } = await client.query("SELECT * FROM player JOIN beat ON beat.player_id=player.playerId;");
    response.send(rows);
});
app.get("/api/beat/:id", async (request, response) => {
    const { id } = request.params;
    console.log("ID: ", id);
    const { rows } = await client.query("SELECT * FROM beat WHERE player_id = $1", [id]);
    response.send(rows);
});
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
app.listen(3000, () => {
    console.log("Redo på http://localhost:3000/");
});
//# sourceMappingURL=index.js.map
import express from "express";
import path from "path";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();

app.use(express.json());

const client = new pg.Client({
  connectionString: process.env.PGURI,
});
client.connect();

app.get("/api/player", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT * FROM player JOIN beat ON beat.player_id=player.playerId;"
  );
  response.send(rows);
});

app.get("/api/beat/:id", async (request, response) => {
  const { id } = request.params;
  console.log("ID: ", id);

  const { rows } = await client.query(
    "SELECT * FROM beat WHERE player_id = $1",
    [id]
  );
  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});

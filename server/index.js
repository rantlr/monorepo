const express = require("express");
const pg = require("pg");

const db = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "rant",
  password: "rantrantrant",
  database: "rant"
});

const app = express();

app.use(express.json());

app.get("/rants", async (req, res) => {
  const { rows: rants } = await db.query("select * from rant order by id desc");
  res.send(rants);
});

app.post("/rants", async (req, res) => {
  const { title, background } = req.body;
  const result = await db.query(
    "insert into rant (title, background) values ($1, $2) returning *",
    [title, background]
  );

  res.status(201).send(result.rows[0]);
});

app.listen(8080, () => {
  console.log("listening on http://localhost:8080/");
});

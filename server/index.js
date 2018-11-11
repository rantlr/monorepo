const express = require('express');
const pg = require('pg');

const actualSubmit = pg.Query.prototype.submit;

pg.Query.prototype.submit = function() {
  console.log(this.text);
  actualSubmit.apply(this, arguments);
};

const db = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user: 'rant',
  password: 'rantrantrant',
  database: 'rant',
});

const app = express();

app.use(express.json());

app.get('/rants', async (req, res) => {
  const { rows: rants } = await db.query('select * from rant order by id desc');
  res.send(rants);
});

app.post('/rants', async (req, res) => {
  const { title, background } = req.body;
  const result = await db.query(
    'insert into rant (title, background) values ($1, $2) returning *',
    [title, background],
  );

  res.status(201).send(result.rows[0]);
});

app.get('/rants/:id', async (req, res) => {
  const { id } = req.params;

  const [{ rows: rants }, { rows: updates }] = await Promise.all([
    db.query('select * from rant where rant.id = $1', [id]),
    db.query('select * from rant_update where rant_id = $1', [id]),
  ]);

  const rant = rants[0];

  res.send({ ...rant, updates });
});

app.post('/rants/:id/updates', async (req, res) => {
  const rantId = req.params.id;
  const { body } = req.body;

  const { rows: rantUpdates } = await db.query(
    'insert into rant_update (rant_id, body) values ($1, $2) returning *',
    [rantId, body],
  );

  res.status(201).send(rantUpdates[0]);
});

app.listen(8080, () => {
  console.log('listening on http://localhost:8080/');
});

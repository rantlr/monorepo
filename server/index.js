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
  const { rows: rants } = await db.query(
    'select * from rant order by rant.created desc',
  );
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
    db.query(
      'select * from rant_update where rant_id = $1 order by rant_update.created',
      [id],
    ),
  ]);

  const rant = rants[0];

  res.send({ ...rant, updates });
});

app.delete('/rants/:id', async (req, res) => {
  const { id } = req.params;

  await db.query('begin');

  const { rows: rantUpdates } = await db.query(
    'delete from rant_update where rant_update.rant_id = $1 returning *',
    [id],
  );

  const {
    rows: [rant],
  } = await db.query('delete from rant where rant.id = $1 returning *', [id]);

  await db.query('commit');

  const deletedRant = { ...rant, updates: rantUpdates };
  res.send(deletedRant);
});

app.post('/rants/:rantId/updates', async (req, res) => {
  const { rantId } = req.params;
  const { body } = req.body;

  const { rows: rantUpdates } = await db.query(
    'insert into rant_update (rant_id, body) values ($1, $2) returning *',
    [rantId, body],
  );

  res.status(201).send(rantUpdates[0]);
});

app.put('/rants/:rantId/updates/:rantUpdateId', async (req, res) => {
  const { rantUpdateId } = req.params;
  const { body } = req.body;

  const { rows: rantUpdates } = await db.query(
    'update rant_update set body = $1, updated = now() where rant_update.id = $2 returning *',
    [body, rantUpdateId],
  );

  res.status(200).send(rantUpdates[0]);
});

app.delete('/rants/:rantId/updates/:rantUpdateId', async (req, res) => {
  const { rantUpdateId } = req.params;

  const { rows: rantUpdates } = await db.query(
    'delete from rant_update where rant_update.id = $1 returning *',
    [rantUpdateId],
  );

  res.send(rantUpdates[0]);
});

app.listen(8080, () => {
  console.log('listening on http://localhost:8080/');
});

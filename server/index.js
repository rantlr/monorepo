const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');

const app = express();
const isDev = app.get('env') === 'development';
const dbConfigName = isDev ? 'development' : 'production';

let db = knex(dbConfig[dbConfigName]);

if (isDev) {
  db = db.on('query', function(data) {
    console.log(data);
  });
}

app.use(express.json());

app.get('/rants', async (_, res) => {
  const rants = await db
    .select()
    .from('rant')
    .orderBy('created_at', 'desc');
  res.json(rants);
});

app.post('/rants', async (req, res) => {
  const { title, background } = req.body;
  const result = await db
    .into('rant')
    .insert({ title, background })
    .returning('*');
  res.status(201).json(result[0]);
});

app.get('/rants/:id', async (req, res) => {
  const { id } = req.params;
  const [rants, updates] = await Promise.all([
    db
      .select()
      .from('rant')
      .where({ id }),
    db
      .select()
      .from('rant_update')
      .where({ rant_id: id })
      .orderBy('created_at'),
  ]);
  const rant = rants[0];
  res.json({ ...rant, updates });
});

app.delete('/rants/:id', async (req, res) => {
  const { id } = req.params;

  const result = await db.transaction(async tx => {
    const updates = await tx
      .delete()
      .from('rant_update')
      .where({
        rant_id: id,
      })
      .returning('*');

    const rants = await tx
      .delete()
      .from('rant')
      .where({ id: id })
      .returning('*');

    return { rants, updates };
  });
  res.send(result);
});

app.post('/rants/:rantId/updates', async (req, res) => {
  const { rantId } = req.params;
  const { body } = req.body;
  const rantUpdates = await db
    .insert({ rant_id: rantId, body })
    .into('rant_update')
    .returning('*');
  res.status(201).json(rantUpdates[0]);
});

app.put('/rants/:rantId/updates/:rantUpdateId', async (req, res) => {
  const { rantUpdateId } = req.params;
  const { body } = req.body;
  const rantUpdates = await db
    .into('rant_update')
    .update({
      body,
      id: rantUpdateId,
      updated_at: new Date(),
    })
    .where({ id: rantUpdateId })
    .returning('*');
  res.status(200).json(rantUpdates[0]);
});

app.delete('/rants/:rantId/updates/:rantUpdateId', async (req, res) => {
  const { rantUpdateId } = req.params;

  const rantUpdates = await db.transaction(tx => {
    return tx
      .delete()
      .from('rant_update')
      .where({ id: rantUpdateId })
      .returning('*');
  });

  res.send(rantUpdates[0]);
});

app.listen(8080, () => {
  console.log('listening on http://localhost:8080/');
});

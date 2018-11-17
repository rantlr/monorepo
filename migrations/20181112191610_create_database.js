exports.up = async knex => {
  await knex.schema.createTable('rant', table => {
    table.increments();
    table.timestamps(false, true);
    table.string('title');
    table.text('background');
  });

  await knex.schema.createTable('rant_update', table => {
    table.increments();
    table.timestamps(false, true);
    table.integer('rant_id');
    table.foreign('rant_id').references('rant.id');
    table.text('body');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('rant_update');
  await knex.schema.dropTable('rant');
};

export const up = async (knex) => {
  return knex.schema
    .createTable('post', (table) => {
      // table.integer('id').primary();
      table.increments();
      table.string('title').notNullable();
      table.string('body').notNullable();
      table.timestamps(true, true);
    })
    .createTable('admin', (table) => {
      table.increments();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists('post').dropTableIfExists('admin');
};

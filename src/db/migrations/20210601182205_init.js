// table.timestamp('created_on', { precision: 6 }).defaultTo(knex.fn.now(6));
// table.timestamp('updated_on', { precision: 6 }).defaultTo(knex.fn.now(6));

export function up(knex) {
  return knex.schema
    .createTable('channel', (table) => {
      table.integer('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('user', (table) => {
      table.integer('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.integer('channelId').references('id').inTable('channel');
      table.timestamps(true, true);
    })
    .createTable('video', (table) => {
      table.integer('id').primary();
      table.string('title').notNullable();
      table
        .integer('channelId')
        .notNullable()
        .references('id')
        .inTable('channel');
      table.timestamps(true, true);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('video')
    .dropTableIfExists('user')
    .dropTableIfExists('channel');
}

// export const up = (knex) => {};
// export const down = (knex) => {};

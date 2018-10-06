exports.up = (knex, Promise) => {
  return Promise.all([

    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary()
      table.string('email_address').notNullable()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamp("create_at").defaultTo(knex.fn.now())
      table.timestamp("modify_at").defaultTo(knex.fn.now())
      table.unique(['email_address', 'username'])
    }),

    knex.schema.createTable('task', (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.boolean('is_done').defaultTo(false)
      table.timestamp("create_at").defaultTo(knex.fn.now())
      table.timestamp("modify_at").defaultTo(knex.fn.now())
      table.foreign('user_id').references('users.id')
    })

  ])
}

exports.down = (knex, Promise) => {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('task'),
  ])

}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([

    knex('users').del()
      .then(() => {
        // Inserts seed entries
        return knex('users').insert([
          {
            id: "5688c1b6-c878-11e8-a8d5-f2801f1b9fd1",
            email_address: "hyperspace018@gmail.com",
            username: "@m_isawk",
            password: "95798588",
            status: false
          }
        ])
      }),

    knex('task').del()
      .then(() => {
        // Inserts seed entries
        return knex('task').insert([
          {
            id: "874dfdd0-c877-11e8-a8d5-f2801f1b9fd1",
            user_id: "5688c1b6-c878-11e8-a8d5-f2801f1b9fd1",
            title: "Example Task",
            description: "New task and this is example",
            is_done: false
          }
        ])
      })

  ])
  
}

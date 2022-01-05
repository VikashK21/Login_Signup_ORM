
exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments();
        t.string("name");
        t.string("email");
        t.string("password");
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("users")
};

exports.up = function (knex) {
    return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary();
      table.string("preferred_name").notNullable();
      table.string("surname", null).notNullable();
      table.string("organization_name", null).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("critics");
  };
  
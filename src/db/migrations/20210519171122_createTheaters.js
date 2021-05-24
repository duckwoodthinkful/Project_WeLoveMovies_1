exports.up = function (knex) {
    return knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary();
      table.string("name").notNullable();
      table.string("address_line_1", null).notNullable();
      table.string("address_line_2", null).notNullable();
      table.string("city", null).notNullable();
      table.string("state", null).notNullable();
      table.string("zip", null).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("theaters");
  };
  
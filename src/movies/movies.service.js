const knex = require("../db/connection");

// List all movies
function list() {
  return knex("movies").select("*");
}

// List movies based on is_showing query
function listShowing(is_showing) {
  return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .where({ "mt.is_showing": is_showing });
}

// Read existing movie based on Id
function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  listShowing,
  read,
};

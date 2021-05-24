const knex = require("../db/connection");

// List all reviews
function list() {
  return knex("reviews").select("*");
}

// List reviews with critic information
function listWithCritic() {
  return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.*", "c.*");
}

// Create a new review
function create(review) {
  //your solution here
  return knex("reviews")
    .insert(review)
    .then((createdRecords) => createdRecords[0]);
}

// Read an existing review
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

// Update an existing review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

// Delete an existing review
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

// Get critic information for an existing review
function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

module.exports = {
  list,
  listWithCritic,
  create,
  read,
  update,
  delete: destroy,
  getCritic,
};

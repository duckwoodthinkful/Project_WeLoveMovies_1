const knex = require("../db/connection");
const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");


// List all of the reviews.
// If there is a movieId, show the reviews for that movie with the critic information.
async function list(req, res) {
  const { movieId } = req.params;

  if (movieId)
  {
    let results = await service.listWithCritic();
    const byResult = movieId
    ? (result) => result.movie_id == movieId
    : () => true;

    results = results.filter(byResult);

    const reduceReviewsAndCritics = reduceProperties("review_id", {
      critic_id: ["critic", "critic_id"],
      preferred_name: ["critic", "preferred_name"],
      surname: ["critic", "surname"],
      organization_name: ["critic", "organization_name"],
    });
    

    const resultdata = reduceReviewsAndCritics(results);

    res.json({ data: resultdata });


  }
  else
  {
    let results = await service.list();
    res.json({ data: results });
  }


}


// Check to see if a review exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}


// Create a new review
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// Update an existing review
async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);

  const critic = await service.getCritic(updatedReview.critic_id);

  updatedReview.updated_at = Date.now();
  updatedReview.created_at = Date.now();

  const result = 
  {
    ...updatedReview,
    critic: critic,
  }

  res.json({ data: result });
}

// Delete an existing review
async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list,
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};

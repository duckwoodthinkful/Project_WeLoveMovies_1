const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// List all movies
async function list(req, res) {
  const is_showing = req.query.is_showing;
  let movies;
  if (is_showing === "true")
  {
      movies = await service.listShowing(true);
  }
  else
  {
      movies = await service.list();
  }

  res.json({ data: movies });

}

// Check to see if a movie exists
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

// Read an existing movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
};

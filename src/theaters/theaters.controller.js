const knex = require("../db/connection");
const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

// List all theaters
// If there is a movieId, list all theaters showing that movie
async function list(req, res) {
    const { movieId } = req.params;
    const results = await service.list();

    if (movieId)
    {
      // Filter results based on a movie id
      const data = results.filter((result)=>result.movie_id == movieId);
      res.json({data: data});  

    }
    else
    {
  
      const reduceTheaterAndMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies", null, "is_showing"],
      });
      
  
      const resultdata = reduceTheaterAndMovies(results);
      res.json({data: resultdata});  
  
    }

  
  }


module.exports = {
  list,
};

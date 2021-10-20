const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const mapMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    movieCreated: ["movies", null, "created_at"],
    movieUpdated: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    mtTheaterId: ["movies", null, "theater_id"]
});

async function list(require, res, next) {
    const data = await theatersService.list();
    const configuredData = mapMovies(data);
    res.json({ data: configuredData });
}


module.exports = {
    list: asyncErrorBoundary(list)
}
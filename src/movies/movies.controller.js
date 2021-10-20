const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const movieId = req.params.movieId
    const movie = await moviesService.read(movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: "Movie cannot be found."})
}

function read(req, res, next) {
    const movie = res.locals.movie
    res.json({ data: movie })
}

async function list(req, res, next) {
    const is_showing = req.query.is_showing;
    if (is_showing) {
        const data = await moviesService.listIsTrue();
        res.json({ data: data });
    } else {
        const data = await moviesService.list();
        res.json({ data });
    }
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    movieExists
}
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movie_id })
        .first()
}

function listIsTrue() {
    return knex("movies")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .select("movies.*")
        .where({ "is_showing": true })
        .distinct()
}

function list() {
    return knex("movies").select("*");
}


module.exports = {
    list,
    listIsTrue,
    read,
}
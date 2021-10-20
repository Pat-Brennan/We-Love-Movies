const knex = require("../db/connection")

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select(
            "t.*",
            "m.*",
            "mt.is_showing",
            "mt.theater_id as mtTheaterId",
            "m.created_at as movieCreated",
            "m.updated_at as movieUpdated");
}

module.exports = {
    list,
}
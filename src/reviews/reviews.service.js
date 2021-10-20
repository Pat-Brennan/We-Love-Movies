const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": review_id })
        .first()
}

function readReviewsAndCritics(review_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(
            "r.*",
            "c.*",
            "c.critic_id as criticId",
            "c.created_at as criticCreated",
            "c.updated_at as criticUpdated"
        )
        .where({ "r.review_id": review_id });
}

function list(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(
            "r.*",
            "c.*",
            "c.critic_id as criticId",
            "c.created_at as criticCreated",
            "c.updated_at as criticUpdated"
        )
        .where({ "r.movie_id": movieId });
}

function update(review) {
    return knex("reviews")
        .where({ "review_id": review.review_id })
        .update({ ...review });
}

function destroy(review_id) {
    return knex("reviews")
        .where({ "review_id": review_id })
        .del();
}

module.exports = {
    read: read,
    delete: destroy,
    list,
    update,
    readReviewsAndCritics
}
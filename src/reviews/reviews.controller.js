const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("critic_id", {
    criticId: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic","organization_name"],
    criticCreated: ["critic", "created_at"],
    criticUpdated: ["critic", "updated_at"],
});


async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId
    const review = await reviewsService.read(reviewId)
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found."})
}

async function list(req, res) {
    const movieId = req.params.movieId;
    const data = await reviewsService.list(movieId);
    const configuredData = reduceCritics(data);
    res.json({ data: configuredData });
}

function read(req, res, next) {
    const review = res.locals.review
    res.json({ data: review })
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await reviewsService.update(updatedReview);
    const data = await reviewsService.readReviewsAndCritics(updatedReview.review_id);
    const configuredData = reduceCritics(data);
    res.json({ data: configuredData[0] });
}

async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), read],
    update: [asyncErrorBoundary(reviewExists), update],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    list: asyncErrorBoundary(list),
}
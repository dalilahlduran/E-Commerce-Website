const prisma =  require("./index");

const createReview = (reviewData) => {
    return prisma.reviews.create({
        data: reviewData
    })
};

const findAllReviews = (review_id) => {
    return prisma.reviews.findMany({
        where: {review_id}
    })
};

const findReviewbyId = (reviews_id) => {
    return prisma.reviews.findUnique({
        where: (review_id)
    })
};

const findReviewbyScore = (score) => {
    return prisma.reviews.findUnique({
        where: {score},
    })
};

const deleteReview

module.exports = {createReview, findReviewbyId, findReviewbyScore, findAllReviews}; 
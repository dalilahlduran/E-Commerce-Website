const prisma =  require("./index");

const createReview = (reviewData) => {
    return prisma.reviews.create({
        data: reviewData
    })
};

const updateReview = (id, reviewData) => {
    return prisma.reviews.update({
        where: {review_id: id},
        data: reviewData,
    })
};

const findReviewbyId = (item_id) => {
    return prisma.reviews.findMany({
        where: {item_id}
    })
};

const deleteReview = async (id) => {
    const review = await findReviewbyId(id);
    if (review){
        return prisma.review.delete({
            where: { review_id: id},
        });
    }
};

module.exports = {createReview, findReviewbyId, updateReview, deleteReview}; 
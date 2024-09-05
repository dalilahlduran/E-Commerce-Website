const prisma =  require("./index");

const createComment = (commentData) => {
    return prisma.comments.create({
        data: commentData
    })
};

const updateComment = (id, commentData) => {
    return prisma.comments.update({
        where: {comment_id: id},
        data: commentData,
    })
};

const findCommentbyId = (comment_id) => {
    return prisma.comments.findUnique({
        where: (comment_id)
    })
};

const deleteComment = async (id) => {
    const comment = await findReviewbyId(id);
    if (comment){
        return prisma.comment.delete({
            where: { comment_id: id},
        });
    }
};

module.exports = {createComment, findCommentbyId, updateComment, deleteComment}; 
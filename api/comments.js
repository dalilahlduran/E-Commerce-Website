const express = require("express");
const commentRouter =  express.Router();
const {createComment, findCommentbyId, updateComment, deleteComment} = require("../database/comments.js");
cont { checkCommentData } = require("./utils");

commentRouter.post("/", async (req, res) => {
    try{
        const comments =  await createComment({...req.body, user_id: req.user.user_id, review_id: req.review.review_id});
        res.send({comments});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error posting your comment"})
    }
});

commentRouter.get("/:id", async(req, res) => {
    try{
        const itemId = await findCommentbyId(req.params.id);
        res.send({itemId});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There are no comments for this item"})
    }
});

commentRouter.put("/:id", async(req, res) => {
    try{
        const { comment, author_id, review_id } = req.body;
        const comments = await updateComment(parseInt(req.params.id), {
            comment,
            author_id,
            review_id
        });
        res.send({comment});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error updating this comment"})
    }
});

commentRouter.delete("/:id", async (req, res) => {
    try{
        const comment = await deleteComment(parseInt(req.params.id));
        res.send ({comment});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error deleting this comment"});
    }
});


module.exports = commentRouter;
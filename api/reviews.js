const express = require("express");
const reviewRouter =  express.Router();
const {createReview, findReviewbyId, updateReview, deleteReview} = require("../database/reviews.js");
cont { checkReviewData } = require("./utils");

reviewRouter.post("/", async (req, res) => {
    try{
        const reviews =  await createReview({...req.body, user_id: req.user.user_id});
        res.send({reviews});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error posting your review"})
    }
});

reviewRouter.get("/:id", async(req, res) => {
    try{
        const itemId = await findReviewbyId(req.params.id);
        res.send({itemId});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There are no reviews for this item"})
    }
});

reviewRouter.put("/:id", async(req, res) => {
    try{
        const { score, txt, user_id, item_id, comments } = req.body;
        const reviews = await updateReview(parseInt(req.params.id), {
            score,
            txt,
            user_id,
            item_id,
            comments,
        });
        res.send({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error updating this review"})
    }
});

reviewRouter.delete("/:id", async (req, res) => {
    try{
        const review = await deleteReview(parseInt(req.params.id));
        res.send ({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "There was an error deleting this review"});
    }
});


module.exports = reviewRouter;


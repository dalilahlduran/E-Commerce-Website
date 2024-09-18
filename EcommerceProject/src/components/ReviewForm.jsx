import { useState } from "react";
import { useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } from "../redux/api";
// import { useCreateReviewMutation } from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../styles/Reviews.css";
import CommentDetail from "./CommentDetail";

function ReviewForm({ token, item, setIsEditing, review }) {
    const initialForm = {
        score: review?.score || 0,
        txt: review?.txt || "",
    };

    const { id } = useParams();
    const [form, updateForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [createReview] = useCreateReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const navigate = useNavigate();

    const removeReview = async () => {
        await deleteReview({ id: review.id, token })
    };

    const handleChange = async ({ target }) => {
        setError(null);
        updateForm({...form, [target.name]: target.value});
    };

    const { score, txt } = form;

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if(score === "" || txt === "") {
            setError("Please provide a rating and text review");
            return;
        }

        updateForm({...form, score: parseFloat(form.score)});
        console.log(review, "Review")
        const { error } = review
        ? await updateReview({ token, body: form, id: review.review_id })
        : await createReview({ token, body: form, id });

        if (error) {
            setError("Something went wrong. Please try again");
            return;
        }

        if (review) {
            setIsEditing(false);
        }

        navigate(`/items/${id}`);
    };

    return (
        <div>
            <form class="reviewform">
            <h5><center>Add A Review</center></h5>
                <label>
                    Score:
                    <input 
                    type="number" 
                    placeholder="Rating (1-5)" 
                    min="1"
                    max="5"
                    name="score" 
                    value={score} onChange={handleChange}/>
                </label>
                <label>
                    Description:
                    <textarea 
                    placeholder="Write your review here..."
                    name="txt" 
                    value={txt} onChange={handleChange}/>
                </label>
                <Button onClick={handleSubmit}>Pickle it</Button>
            </form>
            <Button variant="link" onClick={removeReview}>Delete Review</Button> <Button variant="link" onClick={updateReview}>Update Review </Button>
            <Button variant="link" onClick={() => navigate("/commentform")}>Leave a Comment</Button>
        </div>
    );
}

export default ReviewForm;
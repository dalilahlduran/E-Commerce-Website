import { useState } from "react";
// import { useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } from "../redux/api";
// import { useCreateReviewMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function ReviewForm({ token, review, setIsEditing }) {
    const initialForm = {
        user_id: review?.user_id || "",
        item_id: review?.item_id || "",
        score: review?.score || "",
        txt: review?.txt || "",
    };

    const [form, updateForm] = useState(initialForm);
    const [error, setError] = useState(null);
    // const [createReview] = useCreateReviewMutation;
    // const [updateReview] = useUpdateReviewMutation;
    // const [deleteReview] = useDeleteReviewMutation;
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        updateForm({...form, [target.name]: target.value});
    };

    const { score, txt } = form;

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if(score === "" || txt === "") {
            setError("Please provide a rating and text review");
            return;
        }

        const { error } = review
        // ? await updateReview({ token, body: form, id: review.review_id })
        await createReview({ token, body: form });
        // : await deleteReview ({ token, body: form, review.review_id });

        if (error) {
            setError("Something went wrong. Please try again");
            return;
        }

        if (review) {
            setIsEditing(false);
        }

        navigate("/routes/reviews");
    };

    return (
        <div>
            <h5>Add A Review</h5>
            <form>
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
        </div>
    );
}

export default ReviewForm;
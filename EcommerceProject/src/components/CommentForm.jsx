import { useState } from "react";
import { useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } from "../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../styles/Reviews.css";
import CommentDetail from "./CommentDetail";

function CommentForm({ token, item, setIsEditing, review, cmmt }) {
    const initialForm = {
        comment: comment?.comment || "",
    };

    const { id } = useParams();
    const [form, updateForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommenMutation();
    const [deleteComment] = useDeleteCommenMutation();
    const navigate = useNavigate();

    const removeComment = async () => {
        await deleteComment({ id: review.id, token })
    };

    const handleChange = async ({ target }) => {
        setError(null);
        updateForm({...form, [target.name]: target.value});
    };

    const { comment } = form;

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if(comment === "") {
            setError("Please provide a comment");
            return;
        }

        updateForm({...form, score: parseFloat(comment)});
        console.log(comment, "Comment")
        const { error } = comment
        ? await updateComment({ token, body: form, id: review.review_id })
        : await createComment({ token, body: form, id });

        if (error) {
            setError("Something went wrong. Please try again");
            return;
        }

        if (review) {
            setIsEditing(false);
        }

        navigate(`/routes/items/${id}`);
    };

    return (
        <div>
            <form class="commentform">
            <h5><center>Add A Comment</center></h5>
                <label>
                    Comment:
                    <textarea 
                    placeholder="Write your comment here..."
                    name="comment" 
                    value={comment} onChange={handleChange}/>
                </label>
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
            <Button variant="link" onClick={removeComment}>Delete Comment</Button> <Button variant="link" onClick={updateComment}>Update Comment</Button>
        </div>
    );
}

export default CommentForm;
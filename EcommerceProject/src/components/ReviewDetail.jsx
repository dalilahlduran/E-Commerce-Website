import { useState } from "react";
import { useGetReviewByIdQuery, useDeleteReviewMutation } from "../redux/api";
//component
// import ReviewForm from "./ReviewForm";

function ReviewDetail({ review_id, setReviewSelected, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteReview] = useDeleteReviewMutation();
  let review = {};

  const removeReview = async () => {
    await deleteReview({ id: review_id, token });
    setReviewSelected(null);
  };

  const { data, error, isLoading } = useGetReviewByIdQuery({
    token,
    id: review_id,
  });

  if (data) {
    review = data.review;
  }

  if (isEditing) {
    return (
      <ReviewForm review={review} token={token} setIsEditing={setIsEditing} />
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { score, txt, user_id } = review;
  return (
    <div>
      <a onClick={() => setReviewSelected(null)}> Back</a>
      <div>
        <h2>Item score: {score}</h2>
        <p>Item review: {txt}</p>
        <p>Username: {user_id}</p>
      </div>
    </div>
  );
}

export default ReviewDetail;
import { useState } from "react";
import { useGetItemsQuery, useGetReviewByIdQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";
import Register from "./Register";
import ReviewForm from "./ReviewForm";

function ReviewList({ token, item_id}) {
  const navigate = useNavigate();
  const [reviewSelected, setReviewSelected] = useState(null);
  const { data, isLoading, error } = useGetReviewByIdQuery({token, item_id});

  const reviews = data?.itemId;

  console.log(data)

  if (reviewSelected) {
    return (
      <ReviewDetail
        review_id={reviewSelected.review_id}
        setReviewSelected={setReviewSelected}
        token={token}
      />
    );
  }

  return (
    <div>
      {/* <button onClick={() => navigate("/routes/reviews")}>Add A Review</button> */}
      <h4>Reviews</h4>
      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong</p> : <span />}
      {reviews &&
        reviews.map((review) => (
          <div className="review_card" key={review.review_id}>
            {/* <button onClick={() => setReviewSelected(review)}>
              <img src={review.img_url} />
            </button> */}
            <p><b>Score:</b> {review.score} </p>
            <p><b>Review Description:</b> {review.txt}</p>
            <ReviewForm></ReviewForm>
          </div>
        ))}
    </div>
  );
}

export default ReviewList;
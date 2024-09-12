import { useState } from "react";
import { useGetItemsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";

function ReviewList({ token }) {
  const navigate = useNavigate();
  const [reviewSelected, setReviewSelected] = useState(null);
  const { data, isLoading, error } = useGetReviewsQuery(token);

  const reviews = data?.reviews;

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
      <h2>Reviews</h2>
      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong</p> : <span />}
      <button onClick={() => navigate("/addReview")}>Add A Revie</button>
      {reviews &&
        reviews.map((review) => (
          <div className="review_card" key={review.review_id}>
            <button onClick={() => setReviewSelected(review)}>
              <img src={review.img_url} />
            </button>
            <p>Score: {item.score} </p>
            <p>txt: {item.txt}</p>
          </div>
        ))}
    </div>
  );
}

export default ReviewList;
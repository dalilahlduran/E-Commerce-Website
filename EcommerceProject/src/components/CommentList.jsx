import { useState } from "react";
import { useGetItemsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import CommentDetail from "./CommentDetail";

function CommentList({ token }) {
  const navigate = useNavigate();
  const [commentSelected, setCommentSelected] = useState(null);
  const { data, isLoading, error } = useGetCommentsQuery(token);

  const comments = data?.comments;

  if (commentSelected) {
    return (
      <CommentDetail
        review_id={commentSelected.review_id}
        setCommentSelected={setCommentSelected}
        token={token}
      />
    );
  }

  return (
    <div>
      <h2>Comments</h2>
      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong</p> : <span />}
      <button onClick={() => navigate("/addComment")}>Leave A Comment</button>
      {comments &&
        comments.map((comment) => (
          <div className="comment_card" key={comment.review_id}>
            <button onClick={() => setItemSelected(comment)}>
              <img src={comment.img_url} />
            </button>
            <p>comment: {comment.comment}</p>
          </div>
        ))}
    </div>
  );
}

export default CommentList;
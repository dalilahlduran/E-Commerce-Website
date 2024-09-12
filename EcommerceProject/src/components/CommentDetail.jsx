import { useState } from "react";
import { useGetCommentByIdQuery, useDeleteCommentMutation } from "../redux/api";
//component
import CommentForm from "./CommentForm";

function CommentDetail({ comment_id, setCommentSelected, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();
  let comment = {};

  const removeComment = async () => {
    await deleteComment({ id: comment_id, token });
    setCommentSelected(null);
  };

  const { data, error, isLoading } = useGetCommentByIdQuery({
    token,
    id: comment_id,
  });

  if (data) {
    comment = data.comment;
  }

  if (isEditing) {
    return (
      <CommentForm comment={comment} token={token} setIsEditing={setIsEditing} />
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { comment, review_id, author_id } = comment;
  return (
    <div>
      <a onClick={() => setCommentSelected(null)}> Back</a>
      <div>
        <h2>Review comment: {comment}</h2>
        <p>Username: {author_id}</p>
      </div>
    </div>
  );
}

export default CommentDetail;
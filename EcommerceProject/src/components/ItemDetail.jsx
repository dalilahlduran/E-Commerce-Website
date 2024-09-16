import { useState } from "react";
import { useGetItemByIdQuery } from "../redux/api";
import ReviewList from "./ReviewList";
import CommentList from "./CommentList";
import Button from 'react-bootstrap/Button';
//component
// import ItemForm from "./ItemForm";

function ItemDetail({ item_id, setItemSelected, token }) {
  const [isEditing, setIsEditing] = useState(false);
  let item = {};

  const removeItem = async () => {
    await deleteItem({ id: item_id, token });
    setItemSelected(null);
  };

  const { data, error, isLoading } = useGetItemByIdQuery({
    token,
    id: item_id,
  });

  console.log(data)

  if (data) {
    item = data.itemId;
  }

  if (isEditing) {
    return (
      <ItemForm item={item} token={token} setIsEditing={setIsEditing} />
    );
  }

  if (isLoading||!data) {
    return <p>Loading...</p>;
  }

  const { name, description, img_url } = item;
  return (
    <div>
      <Button><a onClick={() => setItemSelected(null)}> Back</a></Button>
      <div>
        <h2>Name: {name}</h2>
        <p>Description: {description}</p>
        {/* <img src={img_url} /> */}
        <ReviewList token={token} item_id={item.id}>
        <CommentList token={token} item_id={item.id}>
        </CommentList>
        </ReviewList>
      </div>
    </div>
  );
}

export default ItemDetail;
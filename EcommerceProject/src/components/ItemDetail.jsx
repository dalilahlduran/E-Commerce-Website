import { useState } from "react";
import { useGetItemByIdQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ReviewList from "./ReviewList";
import CommentList from "./CommentList";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import blank from "../img/blank.jpg";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

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
     <ButtonGroup aria-label="Basic example">
      <Button variant="secondary" size="sm"><a onClick={() => setItemSelected(null)}> Back</a></Button></ButtonGroup>
      <div>
        <h2>Name: {name}</h2>
        <Card.Img variant="top" height="171" width="180" src={blank} rounded />
        <p><b>Item Description:</b> {description}</p>
        <ReviewList token={token} item_id={item.id}>
        <CommentList token={token} item_id={item.id}>
        </CommentList>
        </ReviewList>
      </div>
    </div>
  );
}

export default ItemDetail;
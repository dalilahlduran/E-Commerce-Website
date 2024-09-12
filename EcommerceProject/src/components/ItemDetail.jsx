import { useState } from "react";
import { useGetItemByIdQuery, useDeleteItemMutation } from "../redux/api";
//component
// import ItemForm from "./ItemForm";

function ItemDetail({ item_id, setItemSelected, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteItem] = useDeleteItemMutation();
  let item = {};

  const removeItem = async () => {
    await deleteItem({ id: item_id, token });
    setItemSelected(null);
  };

  const { data, error, isLoading } = useGetItemByIdQuery({
    token,
    id: item_id,
  });

  if (data) {
    item = data.item;
  }

  if (isEditing) {
    return (
      <ItemForm item={item} token={token} setIsEditing={setIsEditing} />
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { name, description, img_url } = item;
  return (
    <div>
      <a onClick={() => setItemSelected(null)}> Back</a>
      <div>
        <h2>Item Name: {name}</h2>
        <p>Item Description: {description}</p>
        <img src={img_url} />
      </div>
    </div>
  );
}

export default ItemDetail;
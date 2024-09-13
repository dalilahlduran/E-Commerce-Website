import { useState } from "react";
import { useGetItemsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ItemDetail from "./ItemDetail";

function ItemList({ token }) {
  const navigate = useNavigate();
  const [itemSelected, setItemSelected] = useState(null);
  const { data, isLoading, error } = useGetItemsQuery(token);

  const items = data?.allItems;

  console.log(items)

  if (itemSelected) {
    return (
      <ItemDetail
        item_id={itemSelected.id}
        setItemSelected={setItemSelected}
        token={token}
      />
    );
  }

  return (
    <div>
      <h2>Items</h2>
      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong</p> : <span />}
      {/* <button onClick={() => navigate("/addReview")}>Add A Review</button> */}
      {items &&
        items.map((item) => (
          <div className="item_card" key={item.id}>
            <button onClick={() => setItemSelected(item)}>
              {/* <img src={item.img_url} /> */}Click to see more
            </button>
            <p>Name: {item.name} </p>
            <p>Description: {item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default ItemList;
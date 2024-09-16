import { useState } from "react";
import { useGetItemsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import pickleavi from "../img/Pickle-Avi.jpg";

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
      {/* {items && items.map((item) => (
        <div className="item_card" key={item.id}></div>))} */}

  
      {items &&
        items.map((item) => (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pickleavi} />
          <Card.Body>
          <div className="item_card" key={item.id}>
            <Button onClick={() => setItemSelected(item)}>
              {/* <img src={item.img_url} /> */}Click to see more
            </Button>
            <Card.Title><p>Name: {item.name} </p></Card.Title>
            <Card.Text><p>Description: {item.description}</p></Card.Text>
          </div>
          </Card.Body>
       </Card>
        ))}
    </div>
  );
}

export default ItemList;
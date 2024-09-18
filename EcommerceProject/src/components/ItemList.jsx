import { useState } from "react";
import { useGetItemsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import blank from "../img/blank.jpg";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
      <h2>Items</h2><br></br>
      {isLoading ? <p>Loading...</p> : <span />}
      {error ? <p>Oops! Something went wrong</p> : <span />}
      {/* {items && items.map((item) => (
        <div className="item_card" key={item.id}></div>))} */}

  
      {items &&
        items.map((item) => (
          <Row xs={0} md={4} className="g-4">
            {Array.from({ length:4 }).map((_, idx) => (
              <Col key={idx}>
              <Card style={{ height: '90%', width: '16rem' }}>
          <Card.Img variant="top" src={blank} />
          <Card.Body>
          <div className="item_card" key={item.id}>
            <Button onClick={() => setItemSelected(item)}>
              {/* <img src={item.img_url} /> */}Click to see more
            </Button>
            <Card.Text><p>Name: {item.name} </p></Card.Text>
            {/* <Card.Text><p>Description: {item.description}</p></Card.Text> */}
          </div>
          </Card.Body>
       </Card>
              </Col>
              
            ))
      }
      </Row>
      ))}
    </div>
  );
}

export default ItemList;
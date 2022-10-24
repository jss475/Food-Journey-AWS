import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
import React, { useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";

function RestaurantTile({
  res,
  handleLike,
  handleDisLike,
  disable,
  loggedIn,
  disableDislike,
}) {
  const { id, name, image, location, phone, menulink } = res;

  return (
    <div className="media-element">
      <CardGroup >
        <Card bg="light" bsPrefix="customCard" >
        {/* style={{ "min-width": "14rem" }} */}
          <Card.Img variant="top" src={image} className="card_image" />
          <Card.Body id="card_body">
            <Card.Title className="card_name">{name}</Card.Title>
            <Card.Text className="card_text">{location}</Card.Text>
            <Card.Link className="card_link" href={menulink}>Menu</Card.Link>
            {/* <div className="box">
              <iframe src={menulink} width = "300px" height = "300px">
              </iframe>
            </div>  */}
            <br />
            <Button
              variant="danger"
              id="like_button"
              disabled={disable}
              onClick={() => {
                handleLike(res);
              }}
            >
              👍
            </Button>
            <Button
              variant="danger"
              id="dislike_button"
              disabled={disableDislike}
              onClick={() => handleDisLike(res)}
            >
              👎
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>

      {/* <h3>{name}</h3>
      <img src={image} alt={name} height={250} /> */}
      {/* <br /> */}
    </div>
  );
}

export default RestaurantTile;

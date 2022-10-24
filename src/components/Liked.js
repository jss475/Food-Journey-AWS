import React, { useContext } from "react";
import RestaurantTile from "./RestaurantTile";

function Liked({
  likedRes,
  handleLike,
  handleDisLike,
  disable,
  loggedIn,
  disableDislike,
}) {
  //if statement based off of true/false on logged in or not

  const restuarantArray = likedRes.map((res) => {
    // console.log(res)
    return (
      <RestaurantTile
        key={res.id}
        res={res}
        handleLike={handleLike}
        handleDisLike={handleDisLike}
        loggedIn={loggedIn}
        disable={!disable}
      />
    );
  });

  let loggedInCheck;

  //this is for when you first log in
  if (loggedIn === true) {
    loggedInCheck = true;
  } else {

    loggedInCheck = false;
  }

  //if you refresh, i'm checking to see if you're already there
  const userLoggedBefore = localStorage.getItem("username");
  if (userLoggedBefore === null || userLoggedBefore === '') {

  } else {

    loggedInCheck = true;
  }

  return (
    <div className="container-fluid">
      {loggedInCheck ? <h2 id="liked_title">Liked Restaurants!</h2> : null}
      <div className="view_port">{restuarantArray}</div>
    </div>
  );
}

export default Liked;

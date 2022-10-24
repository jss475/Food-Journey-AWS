import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant, User } from './models';
import React, { useEffect, useState, useContext } from "react";
import About from "./components/About";
import NavbarComponent from "./components/Nav";
import RestaurantList from "./components/RestaurantList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import Home from "./components/Home";
import { UserLoggedInContext } from "./context/UserLoggedIn";
import { AllRestaurantsContext } from "./context/AllRestaurants";
import { SignedInContext } from "./context/SignedIn";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  //create useState for the list of users signed up already
  const [allUsers, setAllUsers] = useState([]);
  //set the history variable to use the useHistory hook
  const history = useHistory();

  //we are tracking the route changes wit a state variable called current path
  //current path is then sent to restaurantlist where it is used in the useEffect
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      setCurrentPath(location.pathname);
    });
  }, [history]);

  //set the logged in state to say user has logged in
  const [loggedIn, setLoggedIn] = useContext(SignedInContext);

  //set the current user
  const [currentUser, setCurrentUser] = useContext(UserLoggedInContext);
  //set all the restaurants
  const [allRestaurants, setAllRestaurants] = useContext(AllRestaurantsContext);

  //set sign in message
  const [signInMsg, setSignInMsg] = useState('')
  
  //fetch the users that have signed up already
  const queryUser = async () =>{
    const userList = await DataStore.query(User)
    setAllUsers(userList)
  }
  
  //fetch the restaurants
  const queryRes = async () =>{
    const resList = await DataStore.query(Restaurant)
    setAllRestaurants(resList)
  }

  //make a useEffect to pull all the restaurants
  useEffect(()=> {
    queryRes()
    queryUser()
  },[])

  ///////////////////////// SIGN IN ////////////////////////////////
  function handleSignInSubmit(e) {
    e.preventDefault();
    //if statement to make sure you fill out the form
    if (e.target.password.value === "" && e.target.username.value === "") {
      setSignInMsg("Please Fill Out Your Username and Password!");
    } else if (e.target.password.value === "") {
      setSignInMsg("Please Fill Out Your Password");
    } else if (e.target.username.value === "") {
      setSignInMsg("Please Fill Out Your Username");
    } else {
      //filter out the users that are signed in
      let filteredUsers = allUsers.filter((user) => {
        if (
          user.username === e.target.username.value &&
          user.password === e.target.password.value
        ) {
          return true;
        } else {
          return false;
        }
      });

      //if of bang of the .length so that I am looking for true when it's empty
      if (!filteredUsers.length) {
        //alert("Your Username and Password Are Not In The System");
        setSignInMsg("Your Username and Password Are Not In The System")
      } else {
        //set the state of the users as logged in
        setLoggedIn(true);
        //save current user
        setCurrentUser(e.target.username.value);
        //if user is in the system, redirect the website to restaurants
        history.push("/restaurants");
        //local storage of username
        localStorage.setItem("username", e.target.username.value);
      }
    }
    //do the history to send to home/restaurant list after signing in

    //reset the form after the submit
    document.querySelector("#sign_in_form").reset();
  }
  //////////////////////////// SIGN UP SUBMIT /////////////////////////
  function handleSignUpSubmit(e) {
    e.preventDefault();
    //if statement to make sure you fill out the form
    if (e.target.password.value === "" && e.target.username.value === "") {
      setSignInMsg("Please Fill Out Your Username and Password!");
    } else if (e.target.password.value === "") {
      setSignInMsg("Please Fill Out Your Password");
    } else if (e.target.username.value === "") {
      setSignInMsg("Please Fill Out Your Username");
    } else {
      //filter out the users that have the same username
      let filteredUsers = allUsers.filter((user) => {
        if (user.username === e.target.username.value) {
          return true;
        } else {
          return false;
        }
      });

      //if of bang of the .length so that I am looking for true when it's empty
      if (filteredUsers.length) {
        setSignInMsg("Your Username Is In The System. Please Choose Another One!");
      } else {
        setSignInMsg("Thanks for Signing Up! Please Sign In!");
        //if user is in the system, redirect the website to the list of restaurants
        history.push("/signin");
        //set the state of logged in to true
        // setLoggedIn(true);

        //save current user
        setCurrentUser(e.target.username.value);

        //post the new user into the database
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
            liked: [],
          }),
        };

        fetch("http://localhost:3000/users", configObj)
          .then((res) => res.json())
          .then((data) => setAllUsers([...allUsers, data]));

        //optimistically setallusers
        setAllUsers([...allUsers, {username: e.target.username.value,
          password: e.target.password.value,
          liked: []}])
      }
    }

    //reset the form after the submit
    document.querySelector("#sign_up_form").reset();
  }

  return (
    <div>
    <NavbarComponent loggedIn={loggedIn}/>
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/signin">
        <SignIn handleSignInSubmit={handleSignInSubmit} signInMsg={signInMsg}/>
      </Route>
      <Route path="/restaurants">
        <RestaurantList
          allUsers={allUsers}
          allRestaurants={allRestaurants}
          loggedIn={loggedIn}
          currentPath={currentPath}
        />
      </Route>
      <Route path="/signup">
        <SignUp handleSignUpSubmit={handleSignUpSubmit} signInMsg={signInMsg} />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <h1>404 not found</h1>
      </Route>
    </Switch>

    {/* <Logout /> */}
  </div>
  );
}

export default App;

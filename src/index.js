import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { BrowserRouter } from "react-router-dom";
import { UserLoggedInProvider } from "./context/UserLoggedIn";
import { AllRestaurantsProvider } from "./context/AllRestaurants";
import { SignedInProvider } from "./context/SignedIn";
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SignedInProvider>
    <AllRestaurantsProvider>
      <UserLoggedInProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserLoggedInProvider>
    </AllRestaurantsProvider>
  </SignedInProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

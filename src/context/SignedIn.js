import React, { createContext, useState } from "react";

//create context object
const SignedInContext = createContext();

//create context provider
function SignedInProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(()=> {
    const logged = localStorage.getItem("username")
    return logged ? true : false
  })

  const value = [loggedIn, setLoggedIn];

  return (
    <SignedInContext.Provider value={value}>
      {children}
    </SignedInContext.Provider>
  );
}

//export
export { SignedInContext, SignedInProvider };

import React, { createContext, useState } from "react";

//create context object
const UserLoggedInContext = createContext();

//create context provider
function UserLoggedInProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({

  });

  const value = [currentUser, setCurrentUser];

  return (
    <UserLoggedInContext.Provider value={value}>
      {children}
    </UserLoggedInContext.Provider>
  );
}

//export
export { UserLoggedInContext, UserLoggedInProvider };

import React, { createContext, useState } from "react";

//create context object
const AllRestaurantsContext = createContext();

//create context provider
function AllRestaurantsProvider({ children }) {
  const [allRestaurants, setAllRestaurants] = useState([])

  const value = [allRestaurants, setAllRestaurants];

  return (
    <AllRestaurantsContext.Provider value={value}>
      {children}
    </AllRestaurantsContext.Provider>
  );
}

//export
export { AllRestaurantsContext, AllRestaurantsProvider };

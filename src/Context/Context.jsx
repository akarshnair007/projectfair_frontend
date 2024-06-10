import React, { createContext, useState } from "react";

//step 1 - create context using createContext method
export const AddProjectResponseStatusContext = createContext(); // method to create a context is createContext
export const editProjectResponseContext = createContext();
export const isAuthorizedContext = createContext();
//step 3- destucture children to accecss to context by every component
const Context = ({ children }) => {
  //step 2- create a state in a component
  const [addResponse, setAddResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(true);
  return (
    //step 4- wrap createCreatext around children to provide the value to all component
    <AddProjectResponseStatusContext.Provider
      value={{ addResponse, setAddResponse }} //step 5- add the state that we want all component can get access
    >
      <editProjectResponseContext.Provider
        value={{ editResponse, setEditResponse }}
      >
        <isAuthorizedContext.Provider value={{ isAuthorized, setIsAuthorized }}>
          {children}
        </isAuthorizedContext.Provider>
      </editProjectResponseContext.Provider>
    </AddProjectResponseStatusContext.Provider>
    //step 6- go to your main file and wrap app.js in <Context></Context>
    //step 7- to access context in a component we use useContext
  );
};

export default Context;

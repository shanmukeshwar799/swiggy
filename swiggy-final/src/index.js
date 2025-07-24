import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from "./utils/UserContext";
import { useState } from "react";

function Root() {
  const [loggedInUser, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ loggedInUser, setUserName }}>
      <App />
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
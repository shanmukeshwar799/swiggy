import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "",
  setUserName: () => {},
});

export default UserContext;
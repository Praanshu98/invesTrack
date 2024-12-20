import { createContext, useState, useContext } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isloggedIn: false });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);

export default UserProvider;

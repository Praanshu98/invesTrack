import { createContext, useState, useContext } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const useSetUser = (newUser) => {
    if (newUser) {
      setUser({ ...newUser });
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <userContext.Provider value={{ user, setUser: useSetUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);

export default UserProvider;

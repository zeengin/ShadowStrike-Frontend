import { createContext, useContext, useState, useEffect } from "react";
import { apis } from "../apis";
import axios from "axios";

// Create Context
const UserContext = createContext(null);

// Custom hook for consuming context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const UserData = JSON.parse(localStorage.getItem("ss_user") || "{}");

  // Fetch user from API
  const fetchUser = async () => {
    try {
      const headers = {'Authorization':`Bearer ${token}`}
      const res = await axios.get(`${apis.GET_USER}/${UserData?.user_id}`,{headers});
      console.log("API has been invoked in context")
      setUser(res?.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, loading,token,fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

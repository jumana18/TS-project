import { useEffect } from "react";
import { getUserData } from "./utils/userApi";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserData();
      console.log("API Response:", response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

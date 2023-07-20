import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useAuthContext } from "./context/authContext";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import socket from "./socket/socket";
function App() {
  const { user } = useAuthContext()
  useEffect(() => {
    return () => {
      console.log("socket disconnect")
      socket.disconnect()
    }
  }, [])
  return (
    <div className="App" >
      <Routes>
        {
          user
            ? <>
              <Route path="/" element={<Home />} />
              <Route path="/messenger" element={<Messenger />} />
              <Route path="/profile/:userName" element={<Profile />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
            : <>
              <Route path="/auth/*" element={<Login />} />
              <Route path="/*" element={<Navigate to="/auth" />} />
            </>
        }
      </Routes>
    </div >
  );
}

export default App;

import React, { useState } from "react";
import Detail from "./components/detail/Detail";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(false);

  const handleLogin = () => {
    setUser(true);
  };

  return (
    <div className="container">
      {user ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
      ) : (
        <Login onLogin={handleLogin}/>
      )}
      <Notification/>
    </div>
  )
}
  
export default App;
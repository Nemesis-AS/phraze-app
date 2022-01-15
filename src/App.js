import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Landing from "./components/LandingPage/Landing";
import Feed from "./components/Feed/Feed";

import login from "./login.js";

function App() {
  const [theme, setTheme] = useState("light");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lastLoggedInUser")) setLoginStatus(true);
  }, [loginStatus]);

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#2d3237";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const loginWithDeSo = () => {
    login(onLoginSuccess);
  };

  const onLoginSuccess = () => {
    setLoginStatus(true);
  };

  let navbarContent = {
    toogleSwitch: true,
    settingButton: true,
    publishButton: true,
    loginButton: false,
  }; // for /create navbar component

  return (
    <Router>
      <Switch>
        <Route
          path='/'
          element={
            loginStatus ? <Feed /> : (<>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                loginWithDeSo={loginWithDeSo}
              />
              <Landing mode={theme} loginWithDeso={loginWithDeSo} loginStatus={loginStatus} />
            </>)
          }></Route>
        <Route
          path='/create'
          element={
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                navbarContent={navbarContent}
              />
              <CreateBlog mode={theme} />
            </>
          }></Route>
      </Switch>
    </Router>
  );
}

export default App;

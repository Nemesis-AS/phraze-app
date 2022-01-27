import "./App.css";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Landing from "./components/LandingPage/Landing";
import Feed from "./components/Feed/Feed";
import Post from "./components/Post/Post";

import DesoIdentity from './utils/desoIdentity';
import DesoApi from './utils/desoApi';
const IdentityUsersKey = "identityUsersV2";

function App() {
  const [theme, setTheme] = useState("light");

  const [loggedIn, setLoggedIn] = useState(false);
  const [publicKey, setSetPublicKey] = useState(null);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);

  useEffect(() => {
    const di = new DesoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);

    let user = {};
    if (localStorage.getItem(IdentityUsersKey) === 'undefined'){
      user = {};
    } else if (localStorage.getItem(IdentityUsersKey)){
      user = JSON.parse(localStorage.getItem(IdentityUsersKey) || '{}');
    };

    if(user.publicKey){
        setLoggedIn(true);
        setSetPublicKey(user.publicKey);
    };
  }, []);

  const login = async () => {
    const user = await desoIdentity.loginAsync(4);
    setSetPublicKey(user.publicKey);
    setLoggedIn(true);
  };

  const logout = async () => {
    const result = await desoIdentity.logout(publicKey);
    setSetPublicKey(null);
    setLoggedIn(false);
  };

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#2d3237";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "white";
    }
  };

  let navbarContent = {
    toogleSwitch: true,
    settingButton: true,
    publishButton: true,
    loginButton: false,
    createPost: true,

  }; // for /create navbar component

  return (
    <>
    <Router>
      <Switch>
        <Route
          path='/'
          element={
            loggedIn ? (<>         
            <Navbar
              mode={theme}
              toggleMode={toggleMode}
              navbarContent={navbarContent}
            /> <Feed mode={theme} /></>) : (<>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                loginWithDeSo={login}
              />
              <Landing mode={theme} loginWithDeso={login} loginStatus={loggedIn} />
            </>)
          }
        ></Route>
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
          }
        ></Route>
        <Route
          path="/post/:id"
          element={
            <>
              <Navbar
                mode={theme}
                toggleMode={toggleMode}
                navbarContent={navbarContent}
              />
              <Post mode={theme} />
            </>
          }
        ></Route>
      </Switch>
    </Router>
  </>
  );
}

export default App;

import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Redirect,
  //  Switch,
} from "react-router-dom";

import Home from "./home/Home.jsx";
import Ban from "./shared/components/Pages/Ban";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces.jsx";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";
import Auth from "./user/pages/Auth.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import { AuthContext } from "./shared/context/auth-context";
import Signup from "./user/pages/Signup.jsx";
import RegisterHackatons from "./register/Page/RegisterHackatons.jsx";
import Profile from "./profile/Pages/Profile.jsx";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [ban, setBan] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamId, setTeamId] = useState();
  const [profileImage, setProfileImage] = useState();

  const login = useCallback(
    (userId, userName, teamId, isAdmin = false, ban = false) => {
      setIsLoggedIn(true);
      setUserId(userId);
      setUserName(userName);
      setIsAdmin(isAdmin);
      setTeamId(teamId);
      setBan(ban);
    },
    []
  );

  const updateUsername = useCallback((userName) => {
    setUserName(userName);
  }, []);

  const updateProfilePicture = useCallback((URLimage) => {
    setProfileImage(URLimage);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
    setIsAdmin(false);
    setTeamId(null);
    setBan(null);
  }, []);

  let routes;

  if (isLoggedIn && !isAdmin && !ban) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/registred-hackatons" element={<RegisterHackatons />} />
        <Route path="/users" element={<Users />} />
        {/* Add more routes as needed */}
      </Routes>
    );
  } else if (isLoggedIn && !isAdmin && ban) {
    routes = (
      <Routes>
        <Route path="/" element={<Ban />} />
      </Routes>
    );
  } else if (isLoggedIn && isAdmin) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          userName: userName,
          ban: ban,
          teamId: teamId,
          isAdmin: isAdmin,
          profileImage: profileImage,
          login: login,
          logout: logout,
          updateUsername: updateUsername,
          updateProfilePicture: updateProfilePicture,
        }}
      >
        <Router>
          {/* <Header /> */}
          <ToastContainer />
            {/* <MainNavigation /> */}
            <main style={{ marginTop: 0 }}>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;

import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import SignUpScreen from "./components/SignUpScreen";
import SearchScreen from "./components/SearchScreen";
import DetailsScreen from "./components/DetailsScreen";

function App() {
  return (
    <BrowserRouter>
        <div className="container">
            <Routes>
                <Route element={<HomeScreen/>}>
                    <Route path={"/"}/>
                    <Route path={"/home"}/>
                </Route>
                <Route element = {<LoginScreen/>}>
                    <Route path={"/login"}/>
                </Route>
                <Route element = {<SignUpScreen/>}>
                    <Route path={"/signup"}/>
                </Route>
                <Route element = {<ProfileScreen/>}>
                    <Route path={"/profile"}/>
                </Route>
                <Route element = {<SearchScreen/>}>
                    <Route path={"/search/:searchTerm"}/>
                    <Route path={"/search"}/>
                </Route>
                <Route element = {<DetailsScreen/>}>
                    <Route path={"/details/:id"}/>
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;

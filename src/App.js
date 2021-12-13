import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import SignUpScreen from "./components/SignUpScreen";
import SearchScreen from "./components/SearchScreen";
import DetailsScreen from "./components/DetailsScreen";
import EditProfileScreen from "./components/EditProfileScreen";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path={"/"} element={<HomeScreen/>}/>
                    <Route path={"/home"} element={<HomeScreen/>}/>
                    <Route path={"/login"} element={<LoginScreen/>}/>
                    <Route path={"/signup"} element={<SignUpScreen/>}/>
                    <Route path={"/signup/:role"} element={<SignUpScreen/>}/>
                    <Route path={"/profile"} element={<ProfileScreen/>}/>
                    <Route path={"/profile/:profileId"} element={<ProfileScreen/>}/>
                    <Route path={"/search"} element={<SearchScreen/>}/>
                    <Route path={"/search/:searchTerm"} element={<SearchScreen/>}/>
                    <Route path={"/details/:id"} element={<DetailsScreen/>}/>
                    <Route path={"/edit_profile"} element={<EditProfileScreen/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

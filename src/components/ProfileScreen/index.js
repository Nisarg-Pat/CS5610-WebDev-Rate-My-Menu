import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProfile, logoutUser} from "../../services/userService";
import GetRestaurantMenu from "./GetRestaurantMenu";

const ProfileScreen = () => {
    const navigate = useNavigate();

    const logoutClickHandler = () => {
        logoutUser().then(() => navigate("/"));
    }

    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => setUser(user))
    }, [])

    const getRoleSpecificDiv = (user) => {
        if (user.role === "Restaurant") {
            return (
                <GetRestaurantMenu restaurant={user}/>
            )
        }
        return <></>
    }

    return (
        <>
            <h1>
                {user.username}
            </h1>
            <h1>
                {user.role}
            </h1>
            <div>
                <button className="btn btn-secondary" onClick={logoutClickHandler}>Logout</button>
            </div>
            <button className={"btn btn-primary"} onClick={() => navigate("/search")}>Search
            </button>
            {getRoleSpecificDiv(user)}
        </>
    )
}

export default ProfileScreen;
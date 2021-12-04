import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProfile, logoutUser} from "../../services/userService";

const ProfileScreen = () => {
    const navigate = useNavigate();

    const logoutClickHandler = () => {
        logoutUser().then(() => navigate("/"));
    }

    let [user, setUser] = useState({});

    useEffect(() => {getProfile().then((user) => setUser(user))}, [])

    return(
        <>
            <h1>
                {user.username}
            </h1>
            <div>
                <button className="btn btn-secondary" onClick={logoutClickHandler}>Logout</button>
            </div>
        </>
    )
}

export default ProfileScreen;
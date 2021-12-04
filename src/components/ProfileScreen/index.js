import React from "react";
import {useNavigate} from "react-router-dom";

const ProfileScreen = () => {
    const navigate = useNavigate();

    const logoutClickHandler = () => {
        navigate("/home");
    }

    return(
        <>
            <h1>
                Your name
            </h1>
            <div>
                <button className="btn btn-secondary" onClick={logoutClickHandler}>Logout</button>
            </div>
        </>
    )
}

export default ProfileScreen;
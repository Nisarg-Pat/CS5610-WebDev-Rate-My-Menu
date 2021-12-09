import React from "react";
import {useNavigate} from "react-router-dom";

const HomeScreen = () => {
    const navigate = useNavigate();

    const loginClickHandler = () => {
      navigate("/login");
    }

    const signupClickHandler = () => {
      navigate("/signup");
    }

    const searchClickHandler = () => {
        navigate("/search");
    }

    return(
        <div>
            <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
            <hr/>
            <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
            <hr/>
            <button className={"btn btn-primary"} onClick={searchClickHandler}>Search</button>
        </div>
    )
}

export default HomeScreen;
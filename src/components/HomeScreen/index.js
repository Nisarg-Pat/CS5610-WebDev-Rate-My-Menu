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

    return(
        <div>
            <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
            <hr/>
            <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
        </div>
    )
}

export default HomeScreen;
import React from "react";
import {useNavigate} from "react-router-dom";

const LoginScreen = () => {
    const navigate = useNavigate();

    const loginClickHandler = () => {
        navigate("/profile");
    }

    return(
        <div>
            <label>
                Username:
                <input/>
            </label>
            <label>
                Password:
                <input type="password"/>
            </label>
            <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
        </div>
    )
}

export default LoginScreen;
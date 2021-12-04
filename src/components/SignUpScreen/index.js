import React from "react";
import {useNavigate} from "react-router-dom";

const SignUpScreen = () => {
    const navigate = useNavigate();

    const signupClickHandler = () => {
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
            <label>
                Re-enter Password:
                <input type="password"/>
            </label>
            <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
        </div>
    )
}

export default SignUpScreen;
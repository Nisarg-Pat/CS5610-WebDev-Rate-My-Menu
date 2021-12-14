import React from "react";
import {useNavigate} from "react-router-dom";

const LoginSignupComponent = () => {
    const navigate = useNavigate();
    const loginClickHandler = () => {
        navigate("/login");
    }

    const signupClickHandler = () => {
        navigate("/signup");
    }
    return (
        <div className={"al-login-signup"}>
            <button className={"btn btn-primary al-full al-button"}
                    onClick={loginClickHandler}>Login
            </button>

            <button className={"btn btn-primary al-full al-button al-margin-top-large"}
                    onClick={signupClickHandler}>Sign-Up
            </button>
        </div>
    )
}

export default LoginSignupComponent
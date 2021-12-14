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
                    onClick={loginClickHandler}>
                <span className={"al-flex al-v-center al-h-center al-hide-overflow"}>
                    <i className="fas fa-sign-in-alt"/>
                    <span className={"d-none d-xl-block al-margin-left-small"}>Login</span>
                </span>
            </button>

            <button className={"btn btn-primary al-full al-button al-margin-top-large"}
                    onClick={signupClickHandler}>
                <span className={"al-flex al-v-center al-h-center al-hide-overflow"}>
                    <i className="fas fa-user-plus"/>
                    <span className={"d-none d-xl-block al-margin-left-small"}>SignUp</span>
                </span>
            </button>
        </div>
    )
}

export default LoginSignupComponent
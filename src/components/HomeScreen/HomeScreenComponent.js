import React from "react";
import {useNavigate} from "react-router-dom";

const HomeScreenComponent = ({user}) => {

    const navigate = useNavigate();

    const loginClickHandler = () => {
        navigate("/login");
    }

    const signupClickHandler = () => {
        navigate("/signup");
    }

    const getNoUserHome = () => {
        return (
            <>
                <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
                <hr/>
                <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
                <hr/>
            </>
        )
    }

    const getUserHome = () => {
        return (
            <h1>
                Hello {user.username}
            </h1>
        )
    }

    return(
        <div>
            {
                user._id !== undefined ? getUserHome() : getNoUserHome()
            }
        </div>
    )
}

export default HomeScreenComponent;
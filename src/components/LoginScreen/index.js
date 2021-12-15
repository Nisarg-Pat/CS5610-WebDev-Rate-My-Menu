import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProfile, loginUser} from "../../services/userService";

const LoginScreen = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id !== undefined) {
                navigate("/home");
            }
        })
    }, [navigate])

    const loginClickHandler = () => {
        loginUser(user).then((response) => {
            if (response.status === 403) {
                alert("Invalid Username or Password");
            } else {
                navigate("/home");
            }
        })
    }

    const formHandler = (change, inputType) => {
        let updatedUser = user;
        switch (inputType) {
            case "username":
                updatedUser.username = change;
                setUser(updatedUser);
                break;
            case "password":
                updatedUser.password = change;
                setUser(updatedUser);
                break;
            default:
                break;
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-sm-1 col-md-2 col-lg-3 col-xxl-4"}/>
            <div className={"col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-4 al-signup"}>
                <div className={"al-flex al-h-center"}>
                    <h1>
                        Login
                    </h1>
                </div>
                <div className={"row"}>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Username
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   value={user.username}
                                   placeholder={"Your Username"}
                                   title={"Your Username"}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "username");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Password
                        </div>
                        <div className={"col-6"}>
                            <input type="password" className={"al-signup-input"}
                                   value={user.password}
                                   placeholder={"Your Password"}
                                   title={"Your Password"}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "password");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <div className={"row al-margin-top-large al-padding-left-large al-margin-bottom-small"}>
                        <div className={"col-4"}/>
                        <div className={"col-4"}>
                            <button className={"btn btn-primary al-button al-full"}
                                    onClick={loginClickHandler}>Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-sm-1 col-md-2 col-lg-3 col-xxl-4"}/>
        </div>
    )
}

export default LoginScreen;
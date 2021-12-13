import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProfile, signupUser} from "../../services/userService";

const SignUpScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
                                         username: "",
                                         password: "",
                                         verifypassword: "",
                                         name: "",
                                         date: "",
                                         role: "customer",
                                         description: ""
                                     });

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id !== undefined) {
                navigate("/home");
            }
        })
    }, [navigate])

    const signupClickHandler = () => {
        if (user.username === "" || user.password === "" || user.verifypassword === "" || user.name
            === "" || user.role === "" || user.date === "") {
            alert("Enter correct details");
            return;
        }
        if (user.password !== user.verifypassword) {
            alert("Passwords dont match");
            return;
        }

        signupUser(user).then((response) => {
            if (response.status === 403) {
                alert("Username is already taken");
            } else {
                navigate("/profile");
            }
        });
    }

    const formHandler = (change, inputType) => {
        switch (inputType) {
            case "username":
                setUser({...user, username: change});
                break;
            case "password":
                setUser({...user, password: change});
                break;
            case "verify-password":
                setUser({...user, verifypassword: change});
                break;
            case "role":
                setUser({...user, role: change});
                break;
            case "date":
                setUser({...user, date: change});
                break;
            case "name":
                setUser({...user, name: change});
                break;
            default:
                break;
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-4"}/>
            <div className={"col-4 al-signup"}>
                <div className={"row"}>
                    <div className={"col-4"}/>
                    <div className={"col-4"}>
                        <h1>
                            Signup
                        </h1>
                    </div>
                    <div className={"col-4"}/>
                </div>
                <div className={"row"}>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Username
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   value={user.username}
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
                                   onChange={(e) => {
                                       formHandler(e.target.value, "password");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Re-enter Password
                        </div>
                        <div className={"col-6"}>
                            <input type="password" className={"al-signup-input"}
                                   value={user.verifypassword}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "verify-password");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Name
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   value={user.name}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "name");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            {user.role === "restaurant" ? <>Opening Date</> : <>Date Of Birth</>}
                        </div>
                        <div className={"col-6"}>
                            <input type="date" className={"al-signup-input"}
                                   value={user.date}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "date");
                                   }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Role
                        </div>
                        <div className={"col-6"}>
                            <select className={"al-signup-input"} value={user.role}
                                    onChange={(e) => {
                                        formHandler(e.target.value, "role");
                                    }}>
                                <option value="customer">Customer</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="waiter">Waiter</option>
                            </select>
                        </div>
                    </label>
                    <br/>
                    <div
                        className={"row al-margin-top-large al-padding-left-large al-margin-bottom-small"}>
                        <div className={"col-4"}/>
                        <div className={"col-4"}>
                            <button className={"btn btn-primary al-button al-full"}
                                    onClick={signupClickHandler}>Sign-Up
                            </button>
                        </div>
                        <div className={"col-4"}/>
                    </div>
                </div>
            </div>
            <div className={"col-4"}/>
        </div>
    )
}

export default SignUpScreen;
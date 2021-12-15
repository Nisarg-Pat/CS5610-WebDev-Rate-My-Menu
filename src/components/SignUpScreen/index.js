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
                                         description: "",
                                         email: ""
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
            === "" || user.role === "" || user.date === "" || user.email === "") {
            alert("Enter correct details");
            return;
        }
        if (user.password !== user.verifypassword) {
            alert("Passwords dont match");
            return;
        }
        let email = user.email.split("@");
        if (email.length !== 2) {
            alert("Email not valid");
            return;
        } else {
            let others = email[1].split(".");
            if (others.length !== 2 || others[0] === '' || others[1] === '' || email[0] === ''
                || email[1] === '') {
                alert("Email not valid");
                return;
            }
        }
        signupUser(user).then((response) => {
            if (response.status === 403) {
                alert("Username is already taken");
            } else if (response.status === 404) {
                alert("Restaurant ID not valid");
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
            case "waiterRestaurantId":
                setUser({...user, waiterRestaurantId: change});
                break;
            case "email":
                setUser({...user, email: change});
                break;
            case "address":
                setUser({...user, address: change});
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
                        Signup
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
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Re-enter Password
                        </div>
                        <div className={"col-6"}>
                            <input type="password" className={"al-signup-input"}
                                   value={user.verifypassword}
                                   placeholder={"Rewrite Password"}
                                   title={"Rewrite Password"}
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
                            <input
                                className={"al-signup-input"}
                                value={user.name}
                                placeholder={"Your Name"}
                                title={"Your Name"}
                                onChange={(e) => {
                                    formHandler(e.target.value, "name");
                                }}/>
                        </div>
                    </label>
                    <br/>
                    <label className={"row al-signup-label"}>
                        <div className={"col-6"}>
                            Email
                        </div>
                        <div className={"col-6"}>
                            <input className={"al-signup-input"}
                                   type={"email"}
                                   value={user.email}
                                   placeholder={"Your Email"}
                                   title={"Your Email"}
                                   onChange={(e) => {
                                       formHandler(e.target.value, "email");
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
                                <option value="waiter">Employee</option>
                            </select>
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
                    {user.role === "waiter" ?
                     <>
                         <label className={"row al-signup-label"}>
                             <div className={"col-6"}>
                                 Restaurant Id
                             </div>
                             <div className={"col-6"}>
                                 <input type="text" className={"al-signup-input"}
                                        value={user.waiterRestaurantId}
                                        placeholder={"Restaurant Id"}
                                        title={"Restaurant Id"}
                                        onChange={(e) => {
                                            formHandler(e.target.value, "waiterRestaurantId");
                                        }}/>
                             </div>
                         </label>
                         <br/>
                     </> : <></>}
                    {user.role === "restaurant" ?
                     <>
                         <label className={"row al-signup-label"}>
                             <div className={"col-6"}>
                                 Address
                             </div>
                             <div className={"col-6"}>
                                 <textarea className={"al-signup-input"}
                                           value={user.address}
                                           placeholder={"Your address"}
                                           title={"Your address"}
                                        onChange={(e) => {
                                            formHandler(e.target.value, "address");
                                        }}/>
                             </div>
                         </label>
                         <br/>
                     </> : <></>}

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
            <div className={"col-sm-1 col-md-2 col-lg-3 col-xxl-4"}/>
        </div>
    )
}

export default SignUpScreen;
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
                                         role: "customer"
                                     });

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id !== undefined) {
                navigate("/home");
            }
        })
    }, [navigate])

    const signupClickHandler = () => {
        console.log(user);
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
        <div>
            <label>
                Username:
                <input value={user.username}
                       onChange={(e) => {
                           formHandler(e.target.value, "username");
                       }}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password"
                       value={user.password}
                       onChange={(e) => {
                           formHandler(e.target.value, "password");
                       }}/>
            </label>
            <br/>
            <label>
                Re-enter Password:
                <input type="password"
                       value={user.verifypassword}
                       onChange={(e) => {
                           formHandler(e.target.value, "verify-password");
                       }}/>
            </label>
            <br/>
            <label>
                Name:
                <input
                    value={user.name}
                    onChange={(e) => {
                        formHandler(e.target.value, "name");
                    }}/>
            </label>
            <br/>
            <label>
                {user.role === "restaurant" ? <>Opening Date:</> : <>Date Of Birth:</>}
                <input type="date"
                       value={user.date}
                       onChange={(e) => {
                           formHandler(e.target.value, "date");
                       }}/>
            </label>
            <br/>
            <label>
                Role:
                <select value={user.role} onChange={(e) => {
                    formHandler(e.target.value, "role");
                }}>
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="waiter">Waiter</option>
                </select>
            </label>
            <br/>
            <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
            <br/>
        </div>
    )
}

export default SignUpScreen;
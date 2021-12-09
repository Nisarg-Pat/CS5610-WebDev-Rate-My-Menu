import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signupUser} from "../../services/userService";

const SignUpScreen = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({role: "Customer"});

    const signupClickHandler = () => {
        if(user.password !== user.verifypassword) {
            alert("Passwords dont match");
            return;
        }
        signupUser(user).then((response) => {
            if(response.status === 403) {
                alert("Username is already taken");
            } else {
                navigate("/profile");
            }
        });
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
            case "verify-password":
                updatedUser.verifypassword = change;
                setUser(updatedUser);
                break;
            case "role":
                updatedUser.role = change;
                setUser(updatedUser);
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <label>
                Username:
                <input value={user.username}
                       onChange={(e) => {
                    formHandler(e.target.value, "username");
                }}/>
            </label>
            <label>
                Password:
                <input type="password"
                       value={user.password}
                       onChange={(e) => {
                    formHandler(e.target.value, "password");
                }}/>
            </label>
            <label>
                Re-enter Password:
                <input type="password"
                       value={user.verifypassword}
                       onChange={(e) => {
                    formHandler(e.target.value, "verify-password");
                }}/>
            </label>
            <label>
                Role:
                <select onChange={(e) => {
                    formHandler(e.target.value, "role");
                }}>
                    <option value="Customer" selected>Customer</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Waiter">Waiter</option>
                </select>
            </label>
            {/*{(user.password !== user.verifypassword) && (<div>Passwords dont match</div>)}*/}
            <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
        </div>
    )
}

export default SignUpScreen;
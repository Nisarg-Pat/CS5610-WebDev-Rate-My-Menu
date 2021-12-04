import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../services/userService";

const LoginScreen = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const loginClickHandler = () => {
        loginUser(user).then((response) => {
            if(response.status === 403) {
                alert("Invalid Username or Password");
            } else {
                navigate("/profile");
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

    return(
        <div>
            <label>
                Username:
                <input value={user.username} onChange={(e) => {
                    formHandler(e.target.value, "username");
                }}/>
            </label>
            <label>
                Password:
                <input type="password" value={user.password} onChange={(e) => {
                    formHandler(e.target.value, "password");
                }}/>
            </label>
            <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
        </div>
    )
}

export default LoginScreen;
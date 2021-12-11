import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../../services/userService";

const NavigationSidebar = ({
                               active = "home",
                               user = {},
                               setUser
                           }) => {

    const navigate = useNavigate();

    const logoutClickHandler = () => {
        logoutUser().then(() => {
            setUser({});
            navigate("/home")
        });
    }

    return (
        <>
            <div className="list-group">
                <Link to="/home" className={"list-group-item list-group-item-action"}>
                    Home
                </Link>
                {
                    user._id !== undefined ?
                    <Link to="/profile" className={"list-group-item list-group-item-action"}>
                        Profile
                    </Link> :
                    <></>
                }

                <Link to="/search" className={"list-group-item list-group-item-action"}>
                    Search
                </Link>
                {
                    user._id !== undefined ? <button
                        onClick={logoutClickHandler}>Logout</button> : <></>
                }
            </div>
        </>
    );
}
export default NavigationSidebar;

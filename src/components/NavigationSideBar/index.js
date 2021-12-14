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
            <div className="list-group al-navbar">
                <Link to="/home"
                      className={`list-group-item list-group-item-action ${active === "home" ?"al-navbar-active" : "al-navbar-inactive"}`}>
                    {user._id !== undefined ? <span><img src={user.image} className={"al-profile-image-small al-margin-right-small"}/>{user.name}</span>:<>Home</>  }

                </Link>
                {
                    user._id !== undefined ?
                    <Link to="/profile"
                          className={`list-group-item list-group-item-action ${active === "profile" ?"al-navbar-active" : "al-navbar-inactive"}`}>
                        Profile
                    </Link> :
                    <></>
                }

                <Link to="/search"
                      className={`list-group-item list-group-item-action ${active === "search" ?"al-navbar-active" : "al-navbar-inactive"}`}>
                    Search
                </Link>


                {
                    user._id !== undefined ?
                    <div onClick={logoutClickHandler}
                         className={"list-group-item list-group-item-action al-navbar-inactive al-pointer"}>
                        Logout
                    </div> : <></>
                }
            </div>
        </>
    );
}
export default NavigationSidebar;

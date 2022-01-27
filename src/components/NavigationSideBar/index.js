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
                      className={`list-group-item list-group-item-action ${active === "home"
                                                                           ? "al-navbar-active"
                                                                           : "al-navbar-inactive"}`}>
                    {user._id !== undefined ?
                     <span className={"al-flex al-v-center al-hide-overflow"}>
                         <img src={user.image}
                              className={"al-profile-image-small al-margin-right-small"}
                              alt={user.username}/>
                         <span className={"d-none d-lg-block"}>{user.name}</span>
                     </span> :
                     <span className={"al-flex al-v-center al-hide-overflow"}>
                         <i className="fas fa-home"/>
                         <span className={"d-none d-lg-block al-margin-left-small"}>Home</span>
                     </span>}
                </Link>
                {
                    user._id !== undefined ?
                    <Link to="/profile"
                          className={`list-group-item list-group-item-action ${active === "profile"
                                                                               ? "al-navbar-active"
                                                                               : "al-navbar-inactive"}`}>
                        <span className={"al-flex al-v-center al-hide-overflow"}>
                            <i className="fas fa-user"/>
                            <span
                                className={"d-none d-lg-block al-margin-left-small"}>Profile</span>
                        </span>
                    </Link> :
                    <></>
                }


                {user._id === undefined ?
                 <>
                     <Link to="/login"
                           className={`list-group-item list-group-item-action al-navbar-inactive d-sm-block d-md-none`}>
                    <span className={"al-flex al-v-center al-hide-overflow"}>
                        <i className="fas fa-sign-in-alt"/>
                    </span>
                     </Link>
                     <Link to="/signup"
                           className={`list-group-item list-group-item-action al-navbar-inactive d-sm-block d-md-none`}>
                    <span className={"al-flex al-v-center al-hide-overflow "}>
                        <i className="fas fa-user-plus"/>
                    </span>
                     </Link>
                 </>
                                        : <></>}

                <Link to="/search"
                      className={`list-group-item list-group-item-action ${active === "search"
                                                                           ? "al-navbar-active"
                                                                           : "al-navbar-inactive"}`}>
                    <span className={"al-flex al-v-center al-hide-overflow"}>
                            <i className="fas fa-search"/>
                            <span className={"d-none d-lg-block al-margin-left-small"}>Search</span>
                        </span>
                </Link>


                {
                    user._id !== undefined ?
                    <div onClick={logoutClickHandler}
                         className={"list-group-item list-group-item-action al-navbar-inactive al-pointer"}>
                        <span className={"al-flex al-v-center al-hide-overflow"}>
                            <i className="fas fa-sign-out-alt"/>
                            <span className={"d-none d-lg-block al-margin-left-small"}>Logout</span>
                        </span>
                    </div> : <></>
                }

                <Link to="/privacy_policy"
                      className={`list-group-item list-group-item-action ${active === "privacy"
                                                                           ? "al-navbar-active"
                                                                           : "al-navbar-inactive"}`}>
                    <span className={"al-flex al-v-center al-hide-overflow"}>
                            <i className="fas fa-door-closed"/>
                            <span className={"d-none d-lg-block al-margin-left-small"}>Privacy policy</span>
                        </span>
                </Link>
            </div>
        </>
    );
}
export default NavigationSidebar;

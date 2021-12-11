import React, {useEffect, useState} from "react";
import {getProfile} from "../../services/userService";
import NavigationSidebar from "../NavigationSideBar";
import ProfileScreenComponent from "./ProfileScreenComponent";
import {useNavigate} from "react-router-dom";

const ProfileScreen = () => {
    const navigate = useNavigate();
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id === undefined) {
                navigate("/home");
            } else {
                setUser(user);
            }
        })
    }, [navigate])

    return (
        <>
            <div className="row">
                <div className={"col-2"}>
                    <NavigationSidebar active={"home"} user={user} setUser={setUser}/>
                </div>

                <div className={"col-10"}>
                    <ProfileScreenComponent user={user}/>
                </div>
            </div>
        </>
    )
}

export default ProfileScreen;
import React, {useEffect, useState} from "react";
import {getProfile} from "../../services/userService";
import NavigationSidebar from "../NavigationSideBar";
import ProfileScreenComponent from "./ProfileScreenComponent";
import {useNavigate, useParams} from "react-router-dom";

const ProfileScreen = () => {
    const navigate = useNavigate();
    const params = useParams();
    const profileId = params.profileId || '';

    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => {
            if (user._id === undefined && profileId ==='') {
                navigate("/home");
            } else {
                setUser(user);
            }
        })
    }, [profileId, navigate])

    return (
        <>
            <div className="row">
                <div className={"col-2"}>
                    <NavigationSidebar active={"home"} user={user} setUser={setUser}/>
                </div>

                <div className={"col-10"}>
                    <ProfileScreenComponent user={user} profileId={profileId}/>
                </div>
            </div>
        </>
    )
}

export default ProfileScreen;
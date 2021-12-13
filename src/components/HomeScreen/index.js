import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSideBar";
import HomeScreenComponent from "./HomeScreenComponent";
import {getProfile} from "../../services/userService";

const HomeScreen = () => {
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => setUser(user))
    }, [])
    return (
        <>
            <div className="row">
                <div className={"col-2"}>
                    <NavigationSidebar active={"home"} user={user} setUser={setUser}/>
                </div>

                <div className={"col-10 al-allside-border"}>
                    <HomeScreenComponent user={user}/>
                </div>
            </div>
        </>
    )
}

export default HomeScreen;
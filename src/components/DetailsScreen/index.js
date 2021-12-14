import React, {useEffect, useState} from "react";
import {getProfile} from "../../services/userService";
import NavigationSidebar from "../NavigationSideBar";
import DetailsScreenComponent from "./DetailsScreenComponent";

const DetailsScreen = () => {
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => setUser(user))
    }, [])
    return (
        <>
            <div className="row">
                <div className={"col-2"}>
                    <NavigationSidebar active={"search"} user={user} setUser={setUser}/>
                </div>

                <div className={"col-10"}>
                    <DetailsScreenComponent user={user}/>
                </div>
            </div>
        </>
    )
}

export default DetailsScreen;
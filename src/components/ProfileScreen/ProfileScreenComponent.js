import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {findProfileById} from "../../services/userService";

const ProfileScreenComponent = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();
    const profileId = params.profileId || '';
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        if (profileId !== '') {
            findProfileById(profileId).then((profile) => setProfile(profile));
        }
    }, [profileId])

    const getRoleSpecificDiv = (user) => {
        if (user.role === "Restaurant") {
            return (
                <GetRestaurantMenu restaurant={user}/>
            )
        }
        return <></>
    }

    return (
        <>
            {profileId === '' ?
             <>
                 <h1>
                     {user.username}
                 </h1>
                 <h1>
                     {user.role}
                 </h1>
                 <button className={"btn btn-primary"} onClick={() => navigate("/search")}>Search
                 </button>
                 {getRoleSpecificDiv(user)}
             </> :
             <h1>
                 {profile.username}
             </h1>
            }
        </>
    )
}

export default ProfileScreenComponent;
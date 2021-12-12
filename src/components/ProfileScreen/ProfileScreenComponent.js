import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findProfileById} from "../../services/userService";
import GetDetailsOfOwnProfile from "./GetDetailsOfOwnProfile";
import GetDetailsOfDifferentProfile from "./GetDetailsOfDifferentProfile";

const ProfileScreenComponent = ({user}) => {
    const params = useParams();
    const profileId = params.profileId || '';
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        if (profileId !== '') {
            findProfileById(profileId).then((profile) => setProfile(profile));
        }
    }, [profileId])

    return (
        <>
            {profileId === '' ?
             <GetDetailsOfOwnProfile user={user}/> :
             <GetDetailsOfDifferentProfile user={user} profile={profile}/>
            }
        </>
    )
}

export default ProfileScreenComponent;
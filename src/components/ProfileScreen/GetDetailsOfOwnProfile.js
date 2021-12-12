import React from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";

const GetDetailsOfOwnProfile = ({user}) => {

    const getRoleSpecificDiv = () => {
        if (user.role === "Restaurant") {
            return (
                <GetRestaurantMenu restaurant={user}/>
            )
        }
        return <></>
    }

    return (
        <>
            <h1>
                {user.username}
            </h1>
            <h1>
                {user.role}
            </h1>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfOwnProfile
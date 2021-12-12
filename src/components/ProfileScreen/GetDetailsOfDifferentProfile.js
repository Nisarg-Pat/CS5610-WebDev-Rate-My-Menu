import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {getRatingsOfRestaurant} from "../../services/userRestaurantRatingService";
import RatingBox from "../RatingComponent/RatingBox";

const GetDetailsOfDifferentProfile = ({user, profile}) => {

    let [restaurantRatings, setRestaurantRatings] = useState([]);

    useEffect(() => {
        if (profile.role === "Restaurant") {
            getRatingsOfRestaurant(profile).then((ratings) => setRestaurantRatings(ratings));
        }
    }, [profile])

    const getRoleSpecificDiv = () => {
        if (profile.role === "Restaurant") {
            return (
                <div className={"row"}>
                    <div className={"col-8"}>
                        <h1>
                            Profile Details of : {profile.username}
                        </h1>
                        <GetRestaurantMenu restaurant={profile}/>
                        <ul>
                            {restaurantRatings.map((rating) => {
                                return (
                                    <li>
                                        {rating.comment}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={"col-4"}>
                        {user.role === "Customer" ?
                         <>
                             <RatingBox user={user} restaurant={profile} ratings={restaurantRatings}
                                        setRatings={setRestaurantRatings}/>
                         </> :
                         <></>
                        }
                    </div>
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfDifferentProfile;
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFoodItemFromId} from "../../services/foodItemService";
import {getProfile} from "../../services/userService";
import {addMenuItemToRestaurant} from "../../services/menuService";
import GetRestaurantsFromItem from "./GetRestaurantsFromItem";

const DetailsScreen = () => {
    const navigate = useNavigate();
    const params = useParams();

    let [itemDetails, setItemDetails] = useState({});
    let [user, setUser] = useState({});

    useEffect(() => {
        getProfile().then((user) => setUser(user))
        getFoodItemFromId(params.id).then((result) => setItemDetails(result));
    }, [params.id]);

    const getRoleSpecificDiv = (user) => {
        if (user.role === "Restaurant") {
            return (
                <div>
                    <button className={"btn btn-primary"} onClick={() => {
                        addMenuItemToRestaurant(user, itemDetails).then(navigate("/profile"));
                    }}>Add FoodItem to Menu
                    </button>
                </div>
            )
        } else if (user.role === "Customer") {
            return (
                <div>
                    <GetRestaurantsFromItem item={itemDetails}/>
                </div>
            )
        }
        return (
            <div>
                {user.role}
            </div>
        )
    }

    return (
        <div>
            <h1>
                {itemDetails.title}
            </h1>
            <div dangerouslySetInnerHTML={{__html: itemDetails.summary}}/>
            <br/>
            <img src={itemDetails.image} alt={itemDetails.title}/>
            {user.username}
            {getRoleSpecificDiv(user)}
            {/*{<GetRoleSpecificDiv user={user} />}*/}
        </div>
    )
}

export default DetailsScreen;
import React, {useState} from "react";
import {addMenuItemToRestaurant} from "../../services/menuService";
import {useNavigate} from "react-router-dom";

const AddFoodItemBox = ({restaurant, itemDetails}) => {

    const navigate = useNavigate()

    let [price, setPrice] = useState(0.0);
    let [invalidPriceString, setInvalidPriceString] = useState("");

    return (
        <div className={"al-addFoodItemToRestaurant"}>
            Add Food Item to Menu
            <label className={"al-margin-bottom-small al-full"}>
                Price:
                <input className={"al-signup-input al-margin-top-small al-margin-left-small"}
                       type={"number"}
                       step={0.01}
                       value={price}
                       onChange={(e) => {
                           setPrice(e.target.value)
                       }}/>
            </label>
            <div className={"al-flex al-v-center al-h-center"}>
                <button className={"btn btn-primary al-button"} onClick={() => {
                    if (price <= 0 || price > 100) {
                        setInvalidPriceString("Enter the amount between 0 and 100 dollars.");
                    } else {
                        setInvalidPriceString("");
                        addMenuItemToRestaurant(restaurant, itemDetails, price)
                            .then(navigate("/profile"));
                    }
                }}>Add FoodItem to Menu
                </button>
            </div>
            {invalidPriceString}
        </div>
    )
}

export default AddFoodItemBox;
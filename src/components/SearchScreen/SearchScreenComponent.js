import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {searchFoodItems} from "../../services/foodItemService";
import FoodItemList from "../FoodIemComponent/FoodItemList";

const SearchScreenComponent = ({user}) => {
    const params = useParams();
    const navigate = useNavigate();
    const item = params.searchTerm || '';
    const [searchTerm, setSearchTerm] = useState(item);
    const [foodItems, setFoodItems] = useState([]);

    const searchClickHandler = () => {
        if (searchTerm !== '') {
            navigate(`/search/${searchTerm}`);
            searchFoodItems(searchTerm).then((result) => setFoodItems(result.results));
        }
    }

    useEffect(() => {
        if (item !== '') {
            searchFoodItems(item).then((result) => setFoodItems(result.results));
        }
    }, [item]);
    return (
        <div>
            <div className={"al-flex al-v-center al-margin-bottom-large"}>
                <span className={"al-relative"}>
                    <i className="fas fa-search al-search-icon"/>
                </span>
                <input placeholder={"eg. Burger"}
                       value={searchTerm}
                       title={"Search Input"}
                       onChange={e => setSearchTerm(e.target.value)}
                       className={"al-search-input"}/>
                <button className={"btn btn-primary al-button al-margin-left-medium"}
                        title={"Search Button"} onClick={searchClickHandler}>Search
                </button>
            </div>
            <FoodItemList items={foodItems}/>
        </div>
    )
}

export default SearchScreenComponent;
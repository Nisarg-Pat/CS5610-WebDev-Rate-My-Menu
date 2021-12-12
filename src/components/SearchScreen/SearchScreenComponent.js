import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {searchFoodItems} from "../../services/foodItemService";
import FoodItem from "../FoodIemComponent/FoodItem";
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
        searchFoodItems(searchTerm).then((result) => setFoodItems(result.results))
    }, [searchTerm]);
    return (
        <div>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <button className={"btn btn-primary"} onClick={searchClickHandler}>Search</button>
            <FoodItemList items={foodItems}/>
        </div>
    )
}

export default SearchScreenComponent;
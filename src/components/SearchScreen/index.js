import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {searchFoodItems} from "../../services/foodItemService";
import SearchItem from "./SearchItem";

const SearchScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const item = params.searchTerm || '';
    const [searchTerm, setSearchTerm] = useState(item);
    const [foodItem, setFoodItem] = useState([]);

    const searchClickHandler = () => {
        if (searchTerm !== '') {
            navigate(`/search/${searchTerm}`);
            searchFoodItems(searchTerm).then((result) => setFoodItem(result.results));
        }
    }

    useEffect(() => {
        searchFoodItems(searchTerm).then((result) => setFoodItem(result.results))
    }, [searchTerm]);
    return (
        <div>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <button className={"btn btn-primary"} onClick={searchClickHandler}>Search</button>
            <ul>
                {
                    foodItem.map((item) => <SearchItem item={item}/>)
                }
            </ul>
        </div>
    )
}

export default SearchScreen;
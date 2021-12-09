import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

// let query = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=2&apiKey=28c8823999dc4ef783647f58d191caad`
let query = `http://localhost:4000/api/search`
const SearchScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const item = params.searchTerm || '';
    const [searchTerm, setSearchTerm] = useState(item);
    const [foodItem, setFoodItem] = useState([]);

    const findFoodItem = () => {
        if(searchTerm !== '') {
            navigate(`/search/${searchTerm}`);
            fetch(query).then(res => res.json()).then((result) => setFoodItem(result.results));
        }
    }
    useEffect(findFoodItem, []);
    return (
        <div>
            <input onChange={e => setSearchTerm(e.target.value)}/>
            <button className={"btn btn-primary"} onClick={findFoodItem}>Search</button>
            <ul>
                {
                    foodItem.map(item =>
                         <Link to={`/details/${item.id}`}>
                             <li key={item.id}>
                                 <img src={item.image} height={"50px"}
                                      alt={item.title}/>
                                 {item.title}
                             </li>
                         </Link>
                    )
                }
            </ul>
        </div>
    )
}

export default SearchScreen;
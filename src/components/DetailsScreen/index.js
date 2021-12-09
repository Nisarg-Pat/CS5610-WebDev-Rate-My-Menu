import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const DetailsScreen = () => {
    const params = useParams();
    // let query = `https://api.spoonacular.com/recipes/${params.id}/information?includeNutrition=false&apiKey=28c8823999dc4ef783647f58d191caad`;
    let query = `http://localhost:4000/api/details/${params.id}`
    let [itemDetails, setItemDetails] = useState({});
    const findItemById = () => {
        fetch(query)
            .then(response => response.json()).then((result) => setItemDetails(result))
    }
    useEffect(findItemById, []);
    return(
        <div>
            <h1>
                {itemDetails.title}
            </h1>
            {/*{itemDetails.summary}*/}
            <div dangerouslySetInnerHTML={{__html:itemDetails.summary}}/>
            <br/>
            <img src={itemDetails.image} />
        </div>
    )
}

export default DetailsScreen;
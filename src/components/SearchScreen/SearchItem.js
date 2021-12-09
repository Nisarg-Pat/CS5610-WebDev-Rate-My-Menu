import React from "react";
import {Link} from "react-router-dom";

const SearchItem = ({
                        item = {
                            id: 0,
                            title: "Blank Item",
                            image: "empty.png"
                        }
                    }) => {
    return (
        <Link to={`/details/${item.id}`}>
            <li key={item.id}>
                <img src={item.image} height={"50px"}
                     alt={item.title}/>
                {item.title}
            </li>
        </Link>
    )
}

export default SearchItem;
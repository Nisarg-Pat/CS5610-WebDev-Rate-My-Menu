const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "";


export const findMenuOfRestaurant = (restaurant) => {

    return fetch(`${SERVER_API}/restaurant_menu`, {
        method: "POST",
        body : JSON.stringify({restaurant: restaurant}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json())
}

export const addMenuItemToRestaurant = (restaurant, item) => {
    return fetch(`${SERVER_API}/menu`, {
        method: "POST",
        body : JSON.stringify({restaurant: restaurant, foodItem: item}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const findRestaurantsFromItem = (item) => {
    return fetch(`${SERVER_API}/item_restaurants`, {
        method: "POST",
        body : JSON.stringify({foodItem: item}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

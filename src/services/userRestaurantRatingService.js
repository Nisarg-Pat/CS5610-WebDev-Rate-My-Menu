const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "https://web-dev-project-node-nisargpat.herokuapp.com/api";

export const addRestaurantRating = (restaurantRating) => {
    return fetch(`${SERVER_API}/restaurantRating`, {
        method: "POST",
        body : JSON.stringify(restaurantRating),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const getRatingsOfRestaurant = (restaurant) => {
    return fetch(`${SERVER_API}/ratingsOfRestaurant`, {
        method: "POST",
        body : JSON.stringify({restaurant}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const getRestaurantRatingsByUser = (user) => {
    return fetch(`${SERVER_API}/ratingsOfRestaurantByUser`, {
        method: "POST",
        body : JSON.stringify({user}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}
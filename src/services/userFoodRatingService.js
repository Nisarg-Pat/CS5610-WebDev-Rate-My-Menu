const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "https://web-dev-project-node-nisargpat.herokuapp.com/api";

export const addFoodRating = (foodRating) => {
    return fetch(`${SERVER_API}/foodRating`, {
        method: "POST",
        body : JSON.stringify(foodRating),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const getRatingsOfFoodItem = (item) => {
    return fetch(`${SERVER_API}/foodRatingsOfFood`, {
        method: "POST",
        body : JSON.stringify({foodItem: item}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const getFoodRatingsByUser = (user) => {
    return fetch(`${SERVER_API}/foodRatingsOfUser`, {
        method: "POST",
        body : JSON.stringify({user}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}
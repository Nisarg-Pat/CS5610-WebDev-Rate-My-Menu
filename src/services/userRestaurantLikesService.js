const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "https://web-dev-project-node-nisargpat.herokuapp.com/api";

export const addRestaurantLike = (restaurantLike) => {
    return fetch(`${SERVER_API}/restaurantLike`, {
        method: "POST",
        body : JSON.stringify(restaurantLike),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const getLikesOfRestaurant = (restaurant) => {
    return fetch(`${SERVER_API}/restaurantLikesOfFood`, {
        method: "POST",
        body : JSON.stringify({restaurant}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const getRestaurantLikesByUser = (user) => {
    return fetch(`${SERVER_API}/restaurantLikesOfUser`, {
        method: "POST",
        body : JSON.stringify({user}),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const deleteRestaurantLike = (restaurantLike) => {
    return fetch(`${SERVER_API}/restaurantLike`, {
        method: "DELETE",
        body : JSON.stringify(restaurantLike),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const findRestaurantLike = (like) => {
    return fetch(`${SERVER_API}/findRestaurantLike`, {
        method: "POST",
        body : JSON.stringify(like),
        credentials : "include",
        headers: {
            "content-type": "application/json"
        }
    }).then()
}
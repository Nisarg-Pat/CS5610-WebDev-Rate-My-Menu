const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "";

export const addFoodRating = (user, foodItem, comment, rating) => {
    const foodRating = {
        user,
        foodItem,
        comment,
        rating,
        time: new Date()
    }
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
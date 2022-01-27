export const searchFoodItems = (searchTerm) => {
    const searchQuery = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&apiKey=8e0e06d0db1c41df879263060d194ec8`
    // const searchQuery = `http://localhost:4000/api/search`
    return fetch(searchQuery).then(res => res.json());
}

export const getFoodItemFromId = (id) => {
    let detailsQuery = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=8e0e06d0db1c41df879263060d194ec8`;
    // let detailsQuery = `http://localhost:4000/api/details/${id}`
    return fetch(detailsQuery).then(response => response.json())
}
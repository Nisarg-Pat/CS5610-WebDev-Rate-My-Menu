export const searchFoodItems = (searchTerm) => {
    // const searchQuery = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=10&apiKey=28c8823999dc4ef783647f58d191caad`
    const searchQuery = `http://localhost:4000/api/search`
    return fetch(searchQuery).then(res => res.json());
}

export const getFoodItemFromId = (id) => {
    // let detailsQuery = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=28c8823999dc4ef783647f58d191caad`;
    let detailsQuery = `http://localhost:4000/api/details/${id}`
    return fetch(detailsQuery).then(response => response.json())
}
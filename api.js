export function fetchRecipes(filters) {
    const { ingredients, intolerances, diet } = filters;
  
    let query = '';
    if (ingredients) {
      query += `&includeIngredients=${ingredients}`;
    }
    if (intolerances) {
      query += `&intolerances=${intolerances}`;
    }
    if (diet) {
      query += `&diet=${diet}`;
    }

    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/complexSearch?number=5&${query}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();

    })
}

export function fetchRecipeDetails(id) {
  console.log('fetchRecipeDetails', id);
    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/${id}/information?includeNutrition=false&addWinePairing=false&addTasteData=false&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();
    })
}

export function fetchRecipeInstructions(id) {
    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/${id}/analyzedInstructions?apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();
    })
}
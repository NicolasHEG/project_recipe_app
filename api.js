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
  
    console.log('fetchRecipes query:', query);

    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/complexSearch?number=30&${query}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();

    })
}
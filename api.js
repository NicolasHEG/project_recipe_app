export function fetchRecipes(filters, offset = 0) {
  const { ingredients, intolerances, diet } = filters;

  let query = `number=5&offset=${offset}`;

  // Add filters to the query
  if (ingredients) {
    query += `&includeIngredients=${ingredients}`;
  }
  if (intolerances) {
    query += `&intolerances=${intolerances}`;
  }
  if (diet) {
    query += `&diet=${diet}`;
  }

  return fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/complexSearch?${query}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Fetch failed: " + response.statusText);
    }
    return response.json();
  });
}

export function fetchRecipeDetails(id) {
  return fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/${id}/information?includeNutrition=true&addWinePairing=false&addTasteData=false&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Fetch failed" + response.statusText);
    }
    return response.json();
  });
}

export function fetchRecipeInstructions(id) {
  return fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/${id}/analyzedInstructions?apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Fetch failed" + response.statusText);
    }
    return response.json();
  });
}

export function getGroceryStores(location, storeType, radius) {
  return fetch(
    `${process.env.EXPO_PUBLIC_MAP_API}?data=[out:json];node["shop"=${storeType}](around:${radius},${location.latitude},${location.longitude});out body;`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    return response.json();
  });
}

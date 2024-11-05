export function fetchRecipes(filters, offset = 0) {
  
    const { ingredients, intolerances, diet } = filters;
  
    // Add pagination to the query
    let query = `number=5&offset=${offset}`;
    
    if (ingredients) {
      query += `&includeIngredients=${ingredients}`;
    }
    if (intolerances) {
      query += `&intolerances=${intolerances}`;
    }
    if (diet) {
      query += `&diet=${diet}`;
    }
  
    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/complexSearch?${query}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fetch failed: ' + response.statusText);
        } 
        return response.json();
      });
  /*
  // Return hard coded json recipe
  return Promise.resolve({
    results: [
      {
        id: 716429,
        title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
        imageType: "jpg",
        servings: 2,
        readyInMinutes: 45,
        cookingMinutes: 25,
        preparationMinutes: 20,
        sourceName: "Full Belly Sisters",
        sourceUrl:
          "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
        spoonacularSourceUrl:
          "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
      },
    ],
  });
  */
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
  
  /*
  return Promise.resolve({
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
    imageType: "jpg",
    servings: 2,
    readyInMinutes: 45,
    cookingMinutes: 25,
    preparationMinutes: 20,
    sourceName: "Full Belly Sisters",
    sourceUrl:
      "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
    spoonacularSourceUrl:
      "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
  });
  */
}

export function fetchRecipeInstructions(id) {
  
    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/${id}/analyzedInstructions?apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();
    })
    /*

  return Promise.resolve([
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "Bring a large pot of salted water to a boil. Cook pasta according to package directions. Drain, reserving 1 cup of pasta water.",
        },
        {
          number: 2,
          step: "Meanwhile, heat olive oil in a large skillet over medium heat. Add garlic and red pepper flakes. Cook, stirring, until garlic is fragrant and golden, about 2 minutes.",
        },
        {
          number: 3,
          step: "Add cauliflower and 1/4 cup of the reserved pasta water. Cover and cook until cauliflower is tender, about 10 minutes.",
        },
        {
          number: 4,
          step: "Add scallion whites and cook 2 minutes more.",
        },
        {
          number: 5,
          step: "Add cooked pasta, butter, cheese, and white wine. Toss, adding more pasta water if necessary, until a light sauce coats pasta.",
        },
        {
          number: 6,
          step: "Season with salt and pepper. Serve topped with scallion greens and bread crumbs.",
        },
      ],
    },
  ]);
  */
}

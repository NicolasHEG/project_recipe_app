export function fetchRecipes() {
    return fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/recipes/random?number=10&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fetch failed' + response.statusText);
      } 
      return response.json();

    })
}
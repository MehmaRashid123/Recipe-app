const container = document.querySelector('.card-container');
const left = document.querySelector('.arrow.left');
const right = document.querySelector('.arrow.right');

right.onclick = () => container.scrollBy({ left: 300, behavior: 'smooth' });
left.onclick = () => container.scrollBy({ left: -300, behavior: 'smooth' });

const SUPABASE_URL = "https://ewnfzmbkeiwixvbfrtak.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bmZ6bWJrZWl3aXh2YmZydGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTIwODcsImV4cCI6MjA3NjAyODA4N30.WjEAiXfzTrt4NZdyQxdVpw7OAefxuwS5UAgvqejH4E0";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const searchbox = document.getElementById("SearchBox");
const searchbtn = document.getElementById("SearchBtn");
const recipecontainer = document.querySelector(".recipe-container");

// 🔹 Fetch recipes from Supabase (by name)
const fetchrecipes = async (query) => {
  recipecontainer.innerHTML = ""; // clear old results

  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("id, name, instructions, image_url, category_id, categories(name)")
    .ilike("name", `%${query}%`);

  if (error) {
    console.error(error);
    recipecontainer.innerHTML = "<p class='error-text'>Error fetching recipes.</p>";
    return;
  }

  // No results
  if (!recipes || recipes.length === 0) {
    recipecontainer.innerHTML = "<p class='no-result'>No recipes found.</p>";
    return;
  }

  // 🔹 Render recipes as cards
  recipes.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${meal.image_url}" alt="${meal.name}" class="recipe-img">
      <div class="recipe-info">
        <span class="recipe-category">${meal.categories?.name || "Unknown"}</span>
        <span class="recipe-name">${meal.name}</span>
        <a href="recipe.html?id=${meal.id}" target="_blank" class="recipe-btn">
          View Recipe →
        </a>
      </div>
    `;
    recipecontainer.appendChild(card);
  });
};

// 🔹 Search button event
searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchbox.value.trim();
  if (searchInput) fetchrecipes(searchInput);
});

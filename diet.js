//const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container0");
let searchQuery = "";
let btn = document.querySelectorAll(".btn");
for (i of btn) {
  i.addEventListener("click", function (e) {
    searchQuery = this.value;
    e.preventDefault();

    console.log(searchQuery);
    console.log("https://wjk69x-5000.csb.app/api?q=" + searchQuery);

    fetchAPI();
  });
}

async function fetchAPI() {
  const res = await fetch("https://wjk69x-5000.csb.app/api?q=" + searchQuery);
  const data = await res.json();
  generateHTML(data.hits);
  //console.log(res);
  //console.log("https://wjk69x-5000.csb.app/api?q=" + searchQuery);
  //console.log(data.hits[1].recipe);
}
function generateHTML(results) {
  container.classList.remove("initial");
  // partials
  function ingr(ingr) {
    return `
<ul class="l_list">
${ingr.map((ingrnts) => `<li>${ingrnts}</li>`).join("")}
</ul>
`;
  }
  // end partials
  // output
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item recipe_cart">
      <h1 class="label">${result.recipe.label}</h1>
        <img class="r_img"  src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <br>
        <p class="calories">Calories: ${result.recipe.calories.toFixed(
          2
        )}<span> kcal</span></p>        
        <div class="dietLbls"><h4>Diet label: </h4><p class="dietLabels"> ${ingr(
          result.recipe.dietLabels
        )}</p></div>
        <br>
        <h4>Ingridients list</h4>
        <div class="ingr_lines"><p class="ingredients">Ingredients</p>
        ${ingr(result.recipe.ingredientLines)} </div> 
        <br> 
        <div class="health_labels"><p class="hlbls">Health labels</p>
        ${ingr(result.recipe.healthLabels)}</div>  
     </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

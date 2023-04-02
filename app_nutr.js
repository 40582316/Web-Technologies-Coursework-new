const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container0");
let searchQuery = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const res = await fetch(
    "https://2h1rzh-5000.csb.app/api?ingr=" + searchQuery
  );
  const data = await res.json();
  generateHTML([data]);
  console.log(data);
}
function generateHTML(results) {
  // partials
  function ingr(ingr) {
    return `
<ul class="ingr-list">
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
        <img class="r_img"  src="${"result.recipe.image"}" alt="img">
        <div class="flex-container">
          <h1 class="label">${result.ingredients[0].parsed[0].food}</h1>
          <a class="view-btn" target="_blank" href="${
            result.uri
          }">View Recipe</a>
        </div>
        <p class="calories">Calories: 
        ${result.calories.toFixed(2)}
        <span>kcal</span></p>
        <div class="dietLbls"><h4>Diet label: </h4><p class="dietLabels"> 
        
        ${
          ingr(result.dietLabels).length > 0
            ? result.dietLabels
            : "No Data Found"
        }
        
        ${
          ""
          //ingr(result.dietLabels)
        }
        </p></div>
        <h4>Ingridients list</h4>
        <div class="ingr_lines">${"ingr(result.ingredientLines)"} </div>
        <div class="health_labels">${ingr(result.healthLabels)}</div>
     </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

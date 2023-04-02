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
  const res = await fetch("https://wjk69x-5000.csb.app/api?q=" + searchQuery);
  const data = await res.json();
  myFuncion(data.hits);
  // generateHTML(data.hits);
  console.log(data.hits);
}

function myFuncion(ress) {
  let datas = ress;
  let template = [
    { "<>": "h2", class: "r_label", html: "${recipe.label}" },
    {
      "<>": "div",
      html: [
        { "<>": "ul", html: "${recipe.healthlabels}", class: "health_labels" },
      ],
    },
    { "<>": "ul", class: "ingred", html: "${recipe.ingredientLines}" },
    { "<>": "img", class: "food_img", src: "${recipe.image}" },
  ];

  //native javascript
  document.getElementById("demo").innerHTML = json2html.transform(
    datas,
    template
  );
}
// function generateHTML(results) {
//   console.log(results);
// }

import "/css/style.scss";
import { getAllCocktails, render } from "./functions.js";

const grid = document.querySelector(".app__grid");

async function main() {
  const grid = document.querySelector(".app__grid");
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";
  render({
    grid,
    gridItemTemplate,
    allCocktails,
    filterField,
  });

  document.querySelector(".app__form__reset").onclick = () => {
    document.querySelector("#filterField").value = "";
    //trigger oninput manually
    document.querySelector("#filterField").dispatchEvent(new Event("input"));
  };
  document.querySelector("#filterField").oninput = (e) => {
    filterField = e.target.value;
    render({
      grid,
      gridItemTemplate,
      allCocktails,
      filterField,
    });
  };
}

main();

// met FOR LOOP
// let html = "";
// for (let i = 0; i < allCocktails.length; i++) {
//   html += gridItemTemplate
//     .replaceAll("%NAAM%", allCocktails[i].strDrink)
//     .replaceAll("%FOTO%", allCocktails[i].strDrinkThumb);
// }
// grid.innerHTML = html;

// met FOREACH
// let html = "";
// allCocktails.forEach((cocktail) => {
//   html += gridItemTemplate
//     .replaceAll("%NAAM%", cocktail.strDrink)
//     .replaceAll("%FOTO%", cocktail.strDrinkThumb);
// });
// grid.innerHTML = html;

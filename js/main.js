import "/css/style.scss";
import {
  getAllCocktails,
  renderCocktails,
  renderLikedCocktails,
} from "./functions.js";

async function main() {
  const grid = document.querySelector(".app__grid");
  const likedGrid = document.querySelector(".app__likedgrid");
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const likedGridItemTemplate =
    document.querySelector("#likedgridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";
  const likedCocktails = ["15182", "12560", "13162"];
  renderCocktails({
    grid,
    gridItemTemplate,
    allCocktails,
    filterField,
    likedCocktails,
  });

  renderLikedCocktails({
    likedGrid,
    likedGridItemTemplate,
    likedCocktails,
    allCocktails,
  });

  document.querySelector(".app__form__reset").onclick = () => {
    document.querySelector("#filterField").value = "";
    //trigger oninput manually
    document.querySelector("#filterField").dispatchEvent(new Event("input"));
  };
  document.querySelector("#filterField").oninput = (e) => {
    filterField = e.target.value;
    renderCocktails({
      grid,
      gridItemTemplate,
      allCocktails,
      filterField,
      likedCocktails,
    });
  };

  likedGrid.onclick = (e) => {
    if (e.target.className === "removeLike") {
      //href niet volgen
      e.preventDefault();
      const id = e.target.parentElement.dataset.id;
      likedCocktails.splice(
        likedCocktails.findIndex((cocktailId) => cocktailId === id),
        1
      );
      renderCocktails({
        grid,
        gridItemTemplate,
        allCocktails,
        filterField,
        likedCocktails,
      });
      renderLikedCocktails({
        likedGrid,
        likedGridItemTemplate,
        likedCocktails,
        allCocktails,
      });
    }
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

import "/css/style.scss";
import { getAllCocktails } from "./functions.js";

async function main() {
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const grid = document.querySelector(".app__grid");
  const allCocktails = await getAllCocktails();

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

  grid.innerHTML = allCocktails
    .map(({ strDrink, strDrinkThumb }) =>
      gridItemTemplate
        .replaceAll("%NAAM%", strDrink)
        .replaceAll("%FOTO%", strDrinkThumb)
    )
    .join("");
}

main();

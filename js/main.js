import "../css/style.scss";
import {
  getAllCocktails,
  renderCocktails,
  renderLikedCocktails,
} from "./functions.js";

async function main() {
  history.pushState({}, null, "/");
  const grid = document.querySelector(".app__grid");
  const likedGrid = document.querySelector(".app__likedgrid");
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const likedGridItemTemplate =
    document.querySelector("#likedgridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";
  const likedCocktails =
    JSON.parse(window.localStorage.getItem("likedcocktails")) ?? [];
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
    e.preventDefault();
    if (e.target.className === "removeLike") {
      //href niet volgen
      const id = e.target.parentElement.dataset.id;
      likedCocktails.splice(
        likedCocktails.findIndex((cocktailId) => cocktailId === id),
        1
      );
      window.localStorage.setItem(
        "likedcocktails",
        JSON.stringify(likedCocktails)
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

  grid.onclick = function (e) {
    e.preventDefault();
    if (e.target.parentElement.nodeName === "A") {
      const id = e.target.parentElement.parentElement.dataset.id;
      const name = allCocktails.find((c) => c.idDrink === id).strDrink;
      history.pushState(
        {
          id,
        },
        null,
        "/cocktail/" + name.toLowerCase().replaceAll(" ", "-")
      );
      showCocktail(id);
    }
    if (e.target.classList[0] === "app__grid__item__icon") {
      // console.log("clicked on heart");
      if (e.target.classList[1] === "app__grid__item__icon--heart-o") {
        likedCocktails.push(e.target.parentElement.dataset.id);
      } else {
        likedCocktails.splice(
          likedCocktails.indexOf(e.target.parentElement.dataset.id),
          1
        );
      }
      window.localStorage.setItem(
        "likedcocktails",
        JSON.stringify(likedCocktails)
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

  window.onpopstate = (e) => {
    if (e.state.id) {
      showCocktail(e.state.id);
    } else {
      document.querySelector(".popup").classList.remove("open");
    }
  };

  async function showCocktail(id) {
    document.querySelector(".popup .loading").style.display = "block";
    document.querySelector(".popup .data").style.display = "none";
    document.querySelector(".popup").classList.add("open");
    const cocktail = await (
      await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      )
    ).json();
    const {
      strDrink,
      strDrinkThumb,
      strInstructions,
      strGlass,
      strAlcoholic,
      ...rest
    } = cocktail.drinks[0];
    // opvullen
    document.querySelector(".popup .title").textContent = strDrink;
    document.querySelector(".popup .instructions").textContent =
      strInstructions;
    document.querySelector(".popup .image").src = strDrinkThumb;
    document.querySelector(".popup .glass").textContent = strGlass;
    document.querySelector(".popup .category").textContent = strAlcoholic;

    const listOfIngredients = new Array(15)
      .fill(0)
      .map((el, i) => ({
        ingredient: rest["ingredient" + (i + 1)],
        measure: rest["strMeasure" + (i + 1)],
      }))
      .filter((el) => el.ingredient != null);

    document.querySelector(".popup .ingredients").innerHTML = listOfIngredients
      .map(({ ingredient, measure }) => `<li>${ingredient}: ${measure}</li>`)
      .join("");

    document.querySelector(".popup .loading").style.display = "none";
    document.querySelector(".popup .data").style.display = "block";
  }
}

main();

document.querySelector(".popup button").onclick = function () {
  history.pushState({}, null, "/");
  document.querySelector(".popup").classList.remove("open");
};

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

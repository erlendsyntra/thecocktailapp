export const getAllCocktails = async () => {
  // zoek naar de api endpoint dat alle cocktails opvraagt beginnend met de letter L
  // thecocktaildb
  // fetch met .then.catch
  // fetch met async/await

  // FETCH DATA WITH OLD SCHOOL THEN/CATCH => BAD PRACTICE ... WHY? when we start multiple fetches de second starts after the first

  //   fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data.drinks.map((drink) => drink.strDrink)))
  //     .catch((err) => console.log(err));

  // array with all fetch promises from list of all alfabet letters
  const allDownloads = new Array(3) // 2=Enkel A en B, 26=A-Z
    .fill(65)
    .map((el, i) => String.fromCharCode(el + i))
    .map((ltr) =>
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${ltr}`)
    );

  //we wait for all fetch promises to resolve
  const allResponses = await Promise.all(allDownloads);
  // we wait to get all the json data
  const allDatas = await Promise.all(
    allResponses.map((responseObj) => responseObj.json())
  );
  // from every dataObject we keep only the .drinks
  const allDrinks = allDatas
    .filter((data) => data.drinks != null) // filter out all the drinks that have no cocktails = null
    .map((data) => data.drinks);
  // we flat all the cocktails so they are all in one big array

  // allDrinks.flat().map(function (drinkObj) {
  //   return {
  //     naam: drinkObj.strDrink,
  //     id: drinkObj.idDrink,
  //     foto: drinkObj.strDrinkThumb,
  //   };
  // })

  return allDrinks.flat().map(({ strDrink, idDrink, strDrinkThumb }) => ({
    strDrink,
    idDrink,
    strDrinkThumb,
  }));
};

export function renderLikedCocktails({
  likedGrid,
  likedGridItemTemplate,
  likedCocktails,
  allCocktails,
}) {
  likedGrid.innerHTML = likedCocktails
    .map((id) => {
      const foundCocktail = allCocktails.find((c) => c.idDrink === id);
      return likedGridItemTemplate
        .replaceAll("%NAAM%", foundCocktail.strDrink)
        .replaceAll("%ID%", id)
        .replaceAll("%FOTO%", foundCocktail.strDrinkThumb);
    })
    .join("");
}

export function renderCocktails({
  grid,
  gridItemTemplate,
  allCocktails,
  filterField,
  likedCocktails,
}) {
  let nrOfItems = 0;
  let total = allCocktails.length;
  grid.innerHTML = allCocktails
    .filter((c) =>
      filterField == ""
        ? true
        : c.strDrink.toLowerCase().indexOf(filterField.toLowerCase()) != -1
    )
    .map(({ strDrink, strDrinkThumb, idDrink }) => {
      nrOfItems++;
      return gridItemTemplate
        .replaceAll("%NAAM%", strDrink)
        .replaceAll("%ID%", idDrink)
        .replaceAll(
          "%LIKED%",
          likedCocktails.includes(idDrink) ? "heart" : "heart-o"
        )
        .replaceAll("%FOTO%", strDrinkThumb);
    })
    .join("");
  document.querySelector(".app__header__start").innerText = nrOfItems;
  document.querySelector(".app__header__total").innerText = total;
}

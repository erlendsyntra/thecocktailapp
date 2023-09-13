const getAllCocktails = async () => {
  // zoek naar de api endpoint dat alle cocktails opvraagt beginnend met de letter L
  // thecocktaildb
  // fetch met .then.catch
  // fetch met async/await

  // FETCH DATA WITH OLD SCHOOL THEN/CATCH => BAD PRACTICE ... WHY? when we start multiple fetches de second starts after the first

  //   fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data.drinks.map((drink) => drink.strDrink)))
  //     .catch((err) => console.log(err));

  const allDownloads = [
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l"),
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b"),
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d"),
  ];
  const allResponses = await Promise.all(allDownloads);
  const allDatas = await Promise.all(allResponses.map((r) => r.json()));
  const allDrinks = allDatas.map((d) => d.drinks);

  console.log(allDrinks.flat().map((d) => d.strDrink));
};
getAllCocktails();

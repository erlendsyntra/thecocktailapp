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

  //   const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const alphabet = new Array(26)
    .fill(65)
    .map((el, i) => String.fromCharCode(el + i));

  //   const allDownloads = [
  //     fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l"),
  //     fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b"),
  //     fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=x"),
  //   ];
  const allDownloads = alphabet.map((letter) =>
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
  );

  const allResponses = await Promise.all(allDownloads);
  const allDatas = await Promise.all(
    allResponses.map((response) => response.json())
  );
  const allDrinks = allDatas
    .filter((data) => data.drinks != null)
    .map((data) => data.drinks);

  // creating the object with destructuring an object
  //   return allDrinks.flat().map((data) => ({
  //     name: data.strDrink,
  //     id: data.idDrink,
  //     photo: data.strDrinkThumb
  //   }));

  return allDrinks.flat().map(({ strDrink, idDrink, strDrinkThumb }) => ({
    // ronde haakje nodig want anders ziet hij het als een function ipv van object
    strDrink,
    idDrink,
    strDrinkThumb,
  }));
};

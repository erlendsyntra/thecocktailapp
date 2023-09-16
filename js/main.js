import "/css/style.scss";
import { getAllCocktails } from "./functions.js";

async function main() {
  const allCocktails = await getAllCocktails();
  console.log(allCocktails);
}

main();

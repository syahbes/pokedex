// import Image from "next/image";
import styles from "./page.module.css";

import Card from "./components/card/card";

export default async function Home() {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const pokemonList = await data.json();
  //  console.log(pokemonList);
  return (
    <div>
      <h1>Home</h1>
      <div className={styles.card_list}>
        {pokemonList.results.map((pokemon: { name: string; url: string }) => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

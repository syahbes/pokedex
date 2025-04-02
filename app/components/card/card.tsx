import Image from "next/image";
import styles from "./card.module.css";

type CardProps = {
  name: string;
  url: string;
};

export default async function Card({ name, url }: CardProps) {
  const data = await fetch(url);
  const pokemon = await data.json();
  console.log(pokemon);
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <Image
        src={pokemon.sprites.front_shiny}
        alt={name}
        width={200}
        height={200}
      />
      <p>Types</p>
      <p>
        {pokemon.types.map((type: { type: { name: string } }) => (
          <PokemonType key={type.type.name} type={type.type} />
        ))}
      </p>
      <button>Add to Favorites</button>
    </div>
  );
}

const PokemonType = ({ type }: { type: { name: string } }) => {
  return <div className={styles[type.name]}>{type.name}</div>;
};

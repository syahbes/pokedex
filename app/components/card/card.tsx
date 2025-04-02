"use client";

import Image from "next/image";
import styles from "./card.module.css";
import { addToLocalStorage } from "@/app/util/localStorage";
import { useEffect, useState } from "react";

type CardProps = {
  name: string;
  url: string;
};

export default function Card({ name, url }: CardProps) {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = fetch(url);
    data
      .then((response) => response.json())
      .then((pokemon) => {
        setPokemon(pokemon);
        setLoading(false);
      });
  }, [url]);

  // const data = await fetch(url);
  //   const pokemon = await data.json();
  console.log(pokemon);
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Image
          src={pokemon?.sprites?.front_shiny}
          alt={name}
          width={200}
          height={200}
        />
      )}
      <p>Types</p>
      <p>
        {pokemon?.types?.map((type: { type: { name: string } }) => (
          <PokemonType key={type.type.name} type={type.type} />
        ))}
      </p>
      <button onClick={() => addToFavorites(name, url)}>
        Add to Favorites
      </button>
    </div>
  );
}

const PokemonType = ({ type }: { type: { name: string } }) => {
  return <span className={styles[type.name]}>{type.name}</span>;
};

const addToFavorites = (name: string, url: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favorites.includes(name)) {
    return;
  }
  addToLocalStorage(name, url);
};

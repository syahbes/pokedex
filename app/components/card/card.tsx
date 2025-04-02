"use client";

import Image from "next/image";
import styles from "./card.module.css";
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "@/app/util/localStorage";
import { useEffect, useState } from "react";

type CardProps = {
  name: string;
  url: string;
};

type PokemonData = {
  sprites?: {
    front_shiny: string;
    front_default: string;
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
};

export default function Card({ name, url }: CardProps) {
  const [pokemon, setPokemon] = useState<PokemonData>({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if this Pokemon is in favorites
    const checkFavoriteStatus = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isInFavorites = favorites.some(
        (fav: { name: string }) => fav.name === name
      );
      setIsFavorite(isInFavorites);
    };

    // Fetch Pokemon data
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        setLoading(false);
      }
    };

    checkFavoriteStatus();
    fetchPokemonData();
  }, [name, url]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromLocalStorage(name);
    } else {
      addToLocalStorage(name, url);
    }
    setIsFavorite(!isFavorite);
  };

  // Get image source with fallback
  const getImageSrc = () => {
    if (pokemon?.sprites?.front_shiny) {
      return pokemon.sprites.front_shiny;
    } else if (pokemon?.sprites?.front_default) {
      return pokemon.sprites.front_default;
    } else {
      // Fallback image (you can use a placeholder)
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{name}</h2>
        <button
          onClick={toggleFavorite}
          className={styles.favoriteButton}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <HeartFilled /> : <HeartOutline />}
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <Image
            src={getImageSrc()}
            alt={`${name} pokemon`}
            width={200}
            height={200}
          />
        </div>
      )}

      <div className={styles.typesContainer}>
        <p>Types</p>
        <div className={styles.typesList}>
          {pokemon?.types?.map((type: { type: { name: string } }) => (
            <PokemonType key={type.type.name} type={type.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

const PokemonType = ({ type }: { type: { name: string } }) => {
  return <span className={styles[type.name]}>{type.name}</span>;
};

// SVG for filled heart
const HeartFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#ff4757"
    stroke="#ff4757"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// SVG for outline heart
const HeartOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

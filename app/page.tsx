"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./page.module.css";
import Card from "./components/card/card";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Function to fetch Pokemon data
  const fetchPokemon = async (offsetValue: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offsetValue}`
      );
      const data: PokemonResponse = await response.json();

      // Update state with new data
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPokemon(0);
  }, []);

  // Reference to the last Pokemon card element
  const lastPokemonRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      // Disconnect previous observer if it exists
      if (observer.current) observer.current.disconnect();

      // Create a new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });

      // Observe the last element
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Load more Pokemon when offset changes
  useEffect(() => {
    if (offset > 0) {
      fetchPokemon(offset);
    }
  }, [offset]);

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className={styles.card_list}>
        {pokemonList.map((pokemon, index) => {
          // Add ref to the last element
          if (pokemonList.length === index + 1) {
            return (
              <div key={pokemon.name} ref={lastPokemonRef}>
                <Card name={pokemon.name} url={pokemon.url} />
              </div>
            );
          } else {
            return (
              <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            );
          }
        })}
      </div>
      {isLoading && (
        <div className={styles.loading}>Loading more Pokemon...</div>
      )}
    </div>
  );
}

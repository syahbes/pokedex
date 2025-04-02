"use client";

import Card from "../components/card/card";

export default function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  console.log(favorites);
  return (
    <div>
      <h1>Favorites</h1>
      <p>
        {favorites.length > 0 ? (
          <div>
            {favorites.map((pokemon: { name: string; url: string }) => (
              <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </div>
        ) : (
          <p>No favorites found</p>
        )}
      </p>
    </div>
  );
}

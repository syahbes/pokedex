export const addToLocalStorage = (name: string, url: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorites.push({ name, url });
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFromLocalStorage = (name: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updatedFavorites = favorites.filter(
    (favorite: { name: string }) => favorite.name !== name
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

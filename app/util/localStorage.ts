export const addToLocalStorage = (name: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorites.push(name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFromLocalStorage = (name: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updatedFavorites = favorites.filter(
    (favorite: string) => favorite !== name
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

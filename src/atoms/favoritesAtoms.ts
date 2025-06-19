import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const favoritesAtom = atomWithStorage<string[]>("favoriteCountries", []);

export const useFavorites = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const isFavorite = (code: string) => favorites.includes(code);

  const toggleFavorite = (code: string) => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
};

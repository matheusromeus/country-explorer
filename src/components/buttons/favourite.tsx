"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites } from "@/atoms/favoritesAtoms";

export default function FavoriteButton({ code }: { code: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFavorite(code);
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        className="relative flex items-center cursor-pointer justify-center w-10 h-10 rounded-full transition-colors"
        onClick={handleLike}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className={`w-6 h-6 transition-all duration-200 ${
            isFavorite(code)
              ? "fill-red-500 stroke-red-500"
              : "fill-none stroke-gray-500 hover:stroke-red-500"
          }`}
        />

        {/* Burst animation */}
        {isFavorite(code) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full rounded-full border-2 border-red-300" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

import { useState, useMemo } from "react";
import { MENU_CATEGORIES, MENU_DISHES } from "@/lib/constants/menu";

export default function useMenu() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = useMemo(() => {
    return MENU_DISHES.filter((dish) => {
      const matchesCategory =
        selectedCategory === "todos" || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = MENU_CATEGORIES;

  return {
    categories,
    dishes: MENU_DISHES,
    filteredDishes,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
}

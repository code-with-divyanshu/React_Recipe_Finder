import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipeList, fetchRecipeDetails } from "./recipeActions";

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    searchParam: "",
    loading: false,
    recipeList: [],
    recipeDetailsData: null,
    favoritesList: [],
    error: null,
  },

  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },

    clearRecipes: (state) => {
      state.recipeList = [];
      state.loading = false;
      state.error = null;
    },

    setRecipeDetailsData: (state, action) => {
      state.recipeDetailsData = action.payload;
    },

    handleAddToFavorites: (state, action) => {
      const recipe = action.payload;
      if (!recipe) return;

      const isAlreadyFavorite = state.favoritesList.some(
        (favorite) => favorite.id === recipe.id,
      );

      if (!isAlreadyFavorite) {
        state.favoritesList.push(recipe);
      } else {
        state.favoritesList = state.favoritesList.filter(
          (favorite) => favorite.id !== recipe.id,
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // fetchRecipeList cases
      .addCase(fetchRecipeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeList.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeList = action.payload;
      })
      .addCase(fetchRecipeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchRecipeDetails cases
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.recipeDetailsData = null;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeDetailsData = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchParam,
  clearRecipes,
  setRecipeDetailsData,
  handleAddToFavorites,
} = recipeSlice.actions;

export { fetchRecipeList, fetchRecipeDetails };

export default recipeSlice.reducer;

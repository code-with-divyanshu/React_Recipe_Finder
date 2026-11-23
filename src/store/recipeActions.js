import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipeList = createAsyncThunk(
  "recipe/fetchRecipeList",
  async (searchParam, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`,
      );
      const data = await response.json();
      return data?.data?.recipes || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRecipeDetails = createAsyncThunk(
  "recipe/fetchRecipeDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`,
      );
      const data = await response.json();
      return data?.data || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

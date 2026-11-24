import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeDetails,
  handleAddToFavorites,
} from "../../store/recipeSlice";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipeDetailsData, favoritesList, loading } = useSelector(
    (state) => state.recipes,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [id, dispatch]);

  const recipe = recipeDetailsData?.recipe;
  const isMatchingRecipe = recipe?.id === id;
  const isFavorite =
    favoritesList &&
    recipe &&
    favoritesList.some((item) => item.id === recipe.id);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (loading || !recipe || !isMatchingRecipe) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 animate-spin">
          <i className="fa-solid fa-circle-notch text-xl"></i>
        </div>
        <h2 className="text-xl font-bold text-stone-900">
          Loading recipe details...
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Fetching ingredients and measurements
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Back button supporting browser history */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer group"
        >
          <i className="fa-solid fa-arrow-left text-[11px] group-hover:-translate-x-0.5 transition-transform"></i>
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Image & Overview */}
          <div className="lg:col-span-5 relative bg-stone-100">
            <div className="h-72 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>

          {/* Right Column: Recipe Details & Ingredients */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-3 py-1 rounded-md">
                  {recipe.publisher}
                </span>

                <button
                  type="button"
                  onClick={() => dispatch(handleAddToFavorites(recipe))}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs cursor-pointer ${
                    isFavorite
                      ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                      : "bg-stone-900 text-white hover:bg-stone-800"
                  }`}
                >
                  <i
                    className={`fa-heart ${
                      isFavorite ? "fa-solid text-rose-600" : "fa-regular"
                    }`}
                  ></i>
                  <span>{isFavorite ? "Saved" : "Save Recipe"}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                {recipe.title}
              </h1>

              {/* Servings & Cooking Time if available */}
              {(recipe.cooking_time || recipe.servings) && (
                <div className="flex items-center gap-6 text-xs text-stone-600 py-3 border-y border-stone-100 mb-6 font-medium">
                  {recipe.cooking_time && (
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-clock text-amber-600"></i>
                      <span>{recipe.cooking_time} Minutes</span>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-user-group text-amber-600"></i>
                      <span>Serves {recipe.servings}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Ingredients List */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                    Required Ingredients
                  </h2>
                  <span className="text-xs text-stone-600 font-medium">
                    {recipe.ingredients?.length || 0} items
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-2">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-start gap-2.5 text-xs text-stone-800"
                    >
                      <i className="fa-solid fa-check text-amber-600 mt-0.5 text-[10px] shrink-0"></i>
                      <div>
                        {(ingredient.quantity || ingredient.unit) && (
                          <span className="font-bold text-stone-950 mr-1.5">
                            {ingredient.quantity ? ingredient.quantity : ""}{" "}
                            {ingredient.unit ? ingredient.unit : ""}
                          </span>
                        )}
                        <span className="text-stone-600">
                          {ingredient.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* External Publisher Link */}
            {recipe.source_url && (
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-stone-600">
                  Full step-by-step instructions provided by {recipe.publisher}.
                </p>
                <a
                  href={recipe.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-700 transition-colors"
                >
                  <span>Original Directions</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import RecipeItem from "../../components/RecipeItem/RecipeItem";

export default function SearchResults() {
  const { loading, recipeList, searchParam } = useSelector(
    (state) => state.recipes,
  );

  if (loading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 animate-spin">
          <i className="fa-solid fa-circle-notch text-xl"></i>
        </div>
        <h2 className="text-xl font-bold text-stone-900">
          Searching for recipes...
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Querying dishes matching &ldquo;{searchParam}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {searchParam ? (
            <>
              Results for <span className="text-amber-700">&ldquo;{searchParam}&rdquo;</span>
            </>
          ) : (
            "Explore Recipes"
          )}
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          {recipeList && recipeList.length > 0
            ? `Found ${recipeList.length} delicious dishes ready to cook`
            : searchParam
            ? `No recipes found matching "${searchParam}"`
            : "Type a dish or ingredient in the search bar above"}
        </p>
      </div>

      {recipeList && recipeList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipeList.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            {searchParam ? "No recipes found" : "Search for Recipes"}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            {searchParam
              ? `We couldn't find any dishes matching "${searchParam}". Try a common ingredient like "Pasta", "Chicken", or "Pizza".`
              : "Type any ingredient or dish name in the search bar above to discover recipes."}
          </p>
        </div>
      )}
    </div>
  );
}

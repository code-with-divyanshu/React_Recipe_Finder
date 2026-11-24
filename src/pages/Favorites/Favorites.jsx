import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecipeItem from "../../components/RecipeItem/RecipeItem";

export default function Favorites() {
  const { favoritesList } = useSelector((state) => state.recipes);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-100/70 text-amber-900 border border-amber-200 mb-2">
            <i className="fa-solid fa-heart text-amber-600 text-xs"></i>
            Saved Collections
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Your Recipe Vault
          </h1>
        </div>
        {favoritesList && favoritesList.length > 0 && (
          <span className="text-sm font-medium text-stone-500">
            {favoritesList.length} bookmarked {favoritesList.length === 1 ? "recipe" : "recipes"}
          </span>
        )}
      </div>

      {favoritesList && favoritesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritesList.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200/60 flex items-center justify-center mx-auto mb-4 text-2xl shadow-2xs">
            <i className="fa-regular fa-heart"></i>
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            Your recipe box is empty
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Whenever you find a dish you love, tap &ldquo;Add To Favorites&rdquo; to
            save it here permanently.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            <span>Explore Recipes</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-300/60 transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Clickable Image */}
        <Link
          to={`/recipe-item/${item.id}`}
          className="block h-48 w-full overflow-hidden relative bg-stone-100 cursor-pointer"
        >
          <img
            src={item.image_url}
            alt={item.title || item.publisher}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-stone-900/75 backdrop-blur-md text-white border border-white/20">
              Recipe
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-md inline-block mb-2">
            {item.publisher}
          </span>
          <h2 className="font-bold text-lg text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            <Link
              to={`/recipe-item/${item.id}`}
              title={item.title}
              className="hover:underline cursor-pointer"
            >
              {item.title}
            </Link>
          </h2>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0">
        <Link
          to={`/recipe-item/${item.id}`}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
        >
          <span>View Ingredients</span>
          <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
        </Link>
      </div>
    </div>
  );
}

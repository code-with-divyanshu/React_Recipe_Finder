import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRecipeList, setSearchParam } from "../../store/recipeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quickSearches = [
    { label: "Handmade Pasta", query: "Pasta", icon: "fa-solid fa-bowl-food" },
    { label: "Artisan Pizza", query: "Pizza", icon: "fa-solid fa-pizza-slice" },
    { label: "Fresh Salads", query: "Salad", icon: "fa-solid fa-leaf" },
    { label: "Tender Chicken", query: "Chicken", icon: "fa-solid fa-drumstick-bite" },
    { label: "Avocado & Toast", query: "Avocado", icon: "fa-solid fa-bread-slice" },
    { label: "Gourmet Beef", query: "Beef", icon: "fa-solid fa-utensils" },
    { label: "Artisan Bakery", query: "Cake", icon: "fa-solid fa-cake-candles" },
    { label: "Comfort Soups", query: "Soup", icon: "fa-solid fa-mug-hot" },
  ];

  const curatedCollections = [
    {
      title: "Artisan Italian & Pasta",
      subtitle: "Handcrafted noodles, velvety cacio e pepe & slow-simmered sauces",
      query: "Pasta",
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
      tag: "Classic",
    },
    {
      title: "Wood-Fired Pizza",
      subtitle: "Crispy charred crusts, san marzano tomatoes & fresh basil",
      query: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      tag: "Favorites",
    },
    {
      title: "Garden Fresh & Nourishing",
      subtitle: "Vibrant seasonal greens, Mediterranean grain bowls & vinaigrettes",
      query: "Salad",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      tag: "Healthy",
    },
    {
      title: "Slow-Braised & Roasts",
      subtitle: "Hearty chicken skillets, herb roasts & comfort weeknight plates",
      query: "Chicken",
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
      tag: "Comfort",
    },
    {
      title: "Artisan Bakery & Sweets",
      subtitle: "Decadent tortes, flaky tarts, crumbles & afternoon confectioneries",
      query: "Cake",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      tag: "Baking",
    },
    {
      title: "Coastal Seafood Catch",
      subtitle: "Pan-seared salmon, garlicky shrimp & delicate coastal flavors",
      query: "Seafood",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      tag: "Fresh Catch",
    },
  ];

  const handleSearch = (term) => {
    dispatch(setSearchParam(term));
    dispatch(fetchRecipeList(term));
    navigate("/search");
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle decorative glow elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-100/40 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-stone-100 text-stone-700 border border-stone-200/80 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            10,000+ Curated Global Recipes
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-6">
            Cook with confidence.{" "}
            <span className="block font-serif font-normal italic text-stone-600 mt-1">
              Savor every single bite.
            </span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover verified recipes, step-by-step ingredient measurements, and
            curate your private recipe vault for effortless every-day cooking.
          </p>

          {/* Quick Search Chips */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              Explore Popular Ingredients
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2.5">
              {quickSearches.map((item) => (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => handleSearch(item.query)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-stone-700 border border-stone-200/90 text-xs sm:text-sm font-medium hover:bg-stone-900 hover:text-white hover:border-stone-900 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                >
                  <i className={`${item.icon} text-amber-500 text-xs`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipe Showcase / Chef's Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
                <i className="fa-solid fa-award text-xs"></i>
                Chef&apos;s Featured Spotlight
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                Crispy Skin Salmon with Lemon Garlic Butter
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Crisp on the outside, succulent and flaky within. Infused with
                fresh dill, smashed garlic cloves, and a rich lemon butter pan sauce.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-300 mb-8 border-y border-stone-800 py-4">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-clock text-amber-400"></i>
                  <span>25 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-gauge text-amber-400"></i>
                  <span>Easy Prep</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-star text-amber-400"></i>
                  <span>4.9 (180+ Reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSearch("Salmon")}
                  className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Salmon Recipes</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
                <Link
                  to="/favorites"
                  className="px-5 py-3 rounded-full bg-stone-800/80 hover:bg-stone-800 text-stone-200 font-semibold text-sm border border-stone-700 transition-colors inline-flex items-center gap-2"
                >
                  <i className="fa-regular fa-bookmark text-xs"></i>
                  <span>Your Recipe Box</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80"
                alt="Pan Seared Salmon Dish"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Flavor Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Explore by Culinary Tradition
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            Click any collection to instantly pull hundreds of verified recipes
            matched to your palate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedCollections.map((col) => (
            <div
              key={col.title}
              onClick={() => handleSearch(col.query)}
              className="group relative overflow-hidden rounded-2xl bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200/40 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Tag Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-stone-900/75 backdrop-blur-md text-white border border-white/20">
                  {col.tag}
                </span>
              </div>

              {/* Gradient Overlay & Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold group-hover:text-amber-300 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                  {col.subtitle}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mt-3 group-hover:translate-x-1 transition-transform">
                  <span>Browse Recipes</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Savor Culinary Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
              Designed For The Home Kitchen
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-4">
              Everything you need to cook extraordinary meals
            </h2>
            <p className="text-stone-500 text-sm sm:text-base">
              A minimalist, distraction-free environment built to make meal
              planning enjoyable and seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-start p-6 rounded-2xl bg-stone-50/70 border border-stone-200/50 hover:bg-stone-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-5 shadow-2xs">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Precision Measurements
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Step-by-step ingredient breakdowns with exact culinary units so
                your sauces, batters, and dishes turn out consistent every time.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-stone-50/70 border border-stone-200/50 hover:bg-stone-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-5 shadow-2xs">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Instant Debounced Search
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Query thousands of international recipes in real-time as you type,
                intelligently optimized to minimize lag and eliminate network bloat.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl bg-stone-50/70 border border-stone-200/50 hover:bg-stone-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-5 shadow-2xs">
                <i className="fa-solid fa-bookmark"></i>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Persistent Kitchen Vault
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Bookmark recipes with a single tap. Your curated recipe box is
                persisted locally, always accessible whenever inspiration strikes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist Bottom Callout */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-stone-100/90 to-stone-100/40 border border-stone-200/80">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3 tracking-tight">
            Ready to find tonight&apos;s dinner?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Search for an ingredient in your fridge or explore one of our curated
            themes above.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSearch("Pasta")}
              className="px-6 py-2.5 rounded-full bg-stone-900 text-white font-semibold text-xs sm:text-sm hover:bg-stone-800 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Browse All Pasta
            </button>
            <Link
              to="/favorites"
              className="px-6 py-2.5 rounded-full bg-white text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm hover:bg-stone-50 transition-all duration-200 shadow-2xs"
            >
              Saved Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

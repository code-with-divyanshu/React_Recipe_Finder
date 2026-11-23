import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  clearRecipes,
  fetchRecipeList,
  setSearchParam,
} from "../../store/recipeSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { searchParam, favoritesList } = useSelector((state) => state.recipes);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle typing directly in the search bar with debouncing
  const handleInputChange = (e) => {
    const val = e.target.value;
    dispatch(setSearchParam(val));

    // Clear any previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = val.trim();
    if (!trimmed) {
      dispatch(clearRecipes());
      if (location.pathname === "/search") {
        navigate("/");
      }
      return;
    }

    // Only trigger API and navigation after user stops typing
    debounceTimerRef.current = setTimeout(() => {
      dispatch(fetchRecipeList(trimmed));
      if (location.pathname !== "/search") {
        navigate("/search");
      }
    }, 500);
  };

  // Immediate search on pressing Enter / form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = (searchParam || "").trim();
    if (trimmed) {
      dispatch(fetchRecipeList(trimmed));
      if (location.pathname !== "/search") {
        navigate("/search");
      }
      searchInputRef.current?.blur();
      setMobileMenuOpen(false);
    }
  };

  // Clear button clicked inside input
  const handleClear = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    dispatch(setSearchParam(""));
    dispatch(clearRecipes());
    if (location.pathname === "/search") {
      navigate("/");
    }
    searchInputRef.current?.focus();
  };

  // Home or Logo clicked
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    dispatch(setSearchParam(""));
    dispatch(clearRecipes());
    setMobileMenuOpen(false);
    navigate("/");
  };


  // handle favorites click
  const handleFavoritesClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    dispatch(setSearchParam(""));
    dispatch(clearRecipes());
    navigate("/favorites");
  };

  // Pressing '/' key focuses search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchInputRef.current &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fafaf9]/90 border-b border-stone-200/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo - guaranteed to navigate Home */}
          <NavLink
            to="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3 group shrink-0 focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-utensils text-sm"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                Savor<span className="text-amber-600">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600 -mt-1">
                Recipe Studio
              </span>
            </div>
          </NavLink>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <div className="flex items-center w-full bg-stone-100/90 hover:bg-white focus-within:bg-white border border-stone-200/90 focus-within:border-amber-600/70 focus-within:ring-4 focus-within:ring-amber-500/10 rounded-full px-4 py-2.5 transition-all duration-300 shadow-sm">
                <i className="fa-solid fa-magnifying-glass text-stone-400 group-focus-within:text-amber-600 transition-colors text-sm mr-3"></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  name="search"
                  value={searchParam || ""}
                  onChange={handleInputChange}
                  placeholder="Search recipes, dishes or ingredients..."
                  className="bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none w-full font-medium"
                />

                {searchParam ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-stone-400 hover:text-stone-700 transition-colors rounded-full focus:outline-none cursor-pointer"
                    title="Clear search"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-200/60 rounded border border-stone-300/70 select-none">
                    /
                  </kbd>
                )}
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              onClick={handleHomeClick}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${isActive
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`
              }
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={handleFavoritesClick}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${isActive
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`
              }
            >
              <i className="fa-regular fa-heart text-amber-500"></i>
              <span>Favorites</span>
              {favoritesList && favoritesList.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none bg-amber-500 text-stone-900 rounded-full animate-fade-in">
                  {favoritesList.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <i
                className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"
                  } text-lg`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200/80 animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="flex items-center w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2">
                <i className="fa-solid fa-magnifying-glass text-stone-400 text-sm mr-2.5"></i>
                <input
                  type="text"
                  value={searchParam || ""}
                  onChange={handleInputChange}
                  placeholder="Search recipes..."
                  className="bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none w-full font-medium"
                />
                {searchParam && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-stone-400 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                  </button>
                )}
              </div>
            </form>

            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={handleHomeClick}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-700 hover:bg-stone-100"
                  }`
                }
              >
                <span>Home</span>
                <i className="fa-solid fa-chevron-right text-xs opacity-60"></i>
              </NavLink>

              <NavLink
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-700 hover:bg-stone-100"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-heart text-amber-500"></i>
                  <span>Favorites</span>
                </div>
                {favoritesList && favoritesList.length > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-stone-900 rounded-full">
                    {favoritesList.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

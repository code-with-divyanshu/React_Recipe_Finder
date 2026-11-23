import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import SearchResults from "./pages/SearchResults/SearchResults";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/recipe-item/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;

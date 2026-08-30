import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import BlogId from "./components/BlogContent/Article/Article";
import Contact from "./pages/Contact";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ShopContext from "./components/ShopContext/ShopContext";

function App() {
  const location = useLocation();

  return (
    <ShopContext>
      {/*
        First focusable element on every route: lets a keyboard user skip the
        navigation and land on the page content.

        The href alone moves the caret but leaves the viewport where it was,
        because <main> starts immediately under the fixed navbar — visually
        nothing happened. Setting focus and scrolling by hand makes the jump
        obvious for sighted keyboard users as well as screen reader users.
      */}
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          /*
             Prefer the first section after the hero. <main> begins at the hero
             banner, so focusing it left the viewport exactly where it started
             and the skip link looked broken. Falling back to <main> keeps the
             link working on routes that have no hero.
          */
          const target =
            document.getElementById("main-start") ||
            document.getElementById("main-content");
          if (!target) return;
          target.focus();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogId />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ShopContext>
  );
}

export default App;

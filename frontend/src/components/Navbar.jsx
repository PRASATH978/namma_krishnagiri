import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logoImage from "../assets/ChatGPT Image Jun 5, 2026, 07_18_45 PM.png";

function Navbar() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logoImage}
              alt="Namma Krishnagiri Logo"
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h1 className="text-white font-bold text-lg sm:text-2xl">
                நம்ம கிருஷ்ணகிரி
              </h1>

              <p className="text-green-100 text-xs hidden sm:block">
                People's Voice Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-white hover:text-green-100 font-medium transition"
            >
              🏠 Home
            </Link>

            <Link
              to="/issues"
              className="text-white hover:text-green-100 font-medium transition"
            >
              📢 Issues
            </Link>

            <Link
              to="/dashboard"
              className="text-white hover:text-green-100 font-medium transition"
            >
              📊 Dashboard
            </Link>

            <select
              onChange={(e) =>
                i18n.changeLanguage(e.target.value)
              }
              className="bg-white text-green-700 rounded-lg px-3 py-2 font-medium outline-none"
              defaultValue={i18n.language}
            >
              <option value="ta">தமிழ்</option>
              <option value="en">English</option>
            </select>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mb-4 overflow-hidden">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 border-b hover:bg-green-50"
            >
              🏠 Home
            </Link>

            <Link
              to="/issues"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 border-b hover:bg-green-50"
            >
              📢 Issues
            </Link>

            
            
        

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
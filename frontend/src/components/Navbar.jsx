import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logoImage from "../assets/ChatGPT Image Jun 5, 2026, 07_18_45 PM.png";

function Navbar() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:scale-105 transition duration-300"
          >
            <img
              src={logoImage}
              alt="Namma Krishnagiri Logo"
              className="w-30 h-30 rounded-full border- border-white shadow-md object-cover"
            />

            <div>
              <h3 className="text-white text-small sm:text-xl font-bold tracking-wide">
                நம்ம கிருஷ்ணகிரி
              </h3>

              <p className="text-green-100 text-xs sm:text-sm">
                People's Voice Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-white font-medium hover:text-yellow-300 transition duration-300"
            >
              🏠 Home
            </Link>

            <Link
              to="/issues"
              className="text-white font-medium hover:text-yellow-300 transition duration-300"
            >
              📢 Issues
            </Link>

            <Link
              to="/dashboard"
              className="text-white font-medium hover:text-yellow-300 transition duration-300"
            >
              📊 Dashboard
            </Link>

            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language}
              className="bg-white text-green-700 px-3 py-2 rounded-lg font-medium shadow-md outline-none cursor-pointer"
            >
              <option value="ta">தமிழ்</option>
              <option value="en">English</option>
            </select>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mb-4 overflow-hidden animate-fade-in">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-green-50 transition"
            >
              🏠 Home
            </Link>

            <Link
              to="/issues"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-green-50 transition"
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
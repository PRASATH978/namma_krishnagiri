import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { i18n } = useTranslation();

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
           நம்ம கிருஷ்ணகிரி
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-green-200"
          >
            Home
          </Link>

          <Link
            to="/issues"
            className="hover:text-green-200"
          >
            Issues
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-green-200"
          >
            Dashboard
          </Link>

          {/* Language Switch */}
          <div className="flex gap-2 ml-4">

            <button
              onClick={() => i18n.changeLanguage("ta")}
              className="bg-white text-green-700 px-3 py-1 rounded font-semibold"
            >
              தமிழ்
            </button>

            <button
              onClick={() => i18n.changeLanguage("en")}
              className="bg-white text-green-700 px-3 py-1 rounded font-semibold"
            >
              English
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
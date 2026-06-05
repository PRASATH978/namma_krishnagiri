import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Home() {
const { t } = useTranslation();

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
name: "",
phone: "",
village: "",
category: "",
problem: "",
solution: "",
});

const [image, setImage] = useState(null);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const submitIssue = async () => {
try {
setLoading(true);


  const data = new FormData();

  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  if (image) {
    data.append("image", image);
  }

  await axios.post(
    "https://namma-krishnagiri.onrender.com/api/issues/create/",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  alert("Issue Submitted Successfully");

  setFormData({
    name: "",
    phone: "",
    village: "",
    category: "",
    problem: "",
    solution: "",
  });

  setImage(null);
} catch (error) {
  console.log(error);
  alert("Submission Failed");
} finally {
  setLoading(false);
}


};

const inputStyle =
"w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition";

return (
<> <Navbar />


  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">

    <div className="max-w-6xl mx-auto px-4 py-8">

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white p-8 sm:p-12 shadow-2xl mb-8">

        <div className="absolute right-5 top-0 text-[120px] opacity-10">
          🌿
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            {t("title")}
          </h1>

          <p className="text-green-100 text-lg sm:text-xl max-w-3xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-full">
              📢 Report Issues
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              💡 Suggest Solutions
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              ❤️ Community Support
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
          <div className="text-4xl">📢</div>
          <h3 className="font-bold mt-2">Issues</h3>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
          <div className="text-4xl">❤️</div>
          <h3 className="font-bold mt-2">Support</h3>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-5 text-center">
          <div className="text-4xl">👥</div>
          <h3 className="font-bold mt-2">Citizens</h3>
        </div>

      </div>

      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Submit an Issue
          </h2>

          <p className="text-gray-500 mt-2">
            Your voice matters. Help improve Krishnagiri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="📱 Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputStyle}
          />

        </div>

        <input
          type="text"
          name="village"
          placeholder="📍 Village / Location"
          value={formData.village}
          onChange={handleChange}
          className={`${inputStyle} mt-4`}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`${inputStyle} mt-4`}
        >
          <option value="">Select Category</option>
          <option value="Road">🛣 Road</option>
          <option value="Water">💧 Water</option>
          <option value="Bus">🚌 Bus</option>
          <option value="Hospital">🏥 Hospital</option>
          <option value="Jobs">💼 Jobs</option>
          <option value="Education">🎓 Education</option>
          <option value="Other">📌 Other</option>
        </select>

        <textarea
          rows="4"
          name="problem"
          placeholder="Describe the problem..."
          value={formData.problem}
          onChange={handleChange}
          className={`${inputStyle} mt-4`}
        />

        <textarea
          rows="4"
          name="solution"
          placeholder="Suggest a solution..."
          value={formData.solution}
          onChange={handleChange}
          className={`${inputStyle} mt-4`}
        />

        <div className="mt-4">

          <label className="font-semibold text-gray-700">
            Upload Photo
          </label>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className={`${inputStyle} mt-2`}
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-4 rounded-2xl shadow-lg max-h-72"
            />
          )}

        </div>

        <button
          onClick={submitIssue}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "🚀 Submit Issue"}
        </button>

      </div>

    </div>
  </div>
</>


);
}

export default Home;

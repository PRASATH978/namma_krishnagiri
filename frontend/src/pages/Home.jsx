import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    category: "",
    problem: "",
    solution: "",
  });
  const { t } = useTranslation();

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitIssue = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("village", formData.village);
      data.append("category", formData.category);
      data.append("problem", formData.problem);
      data.append("solution", formData.solution);

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
    }
  };

  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">

        <h1 className="text-5xl font-bold text-center text-black mb-4 ">
           {t("title")}
        </h1>

        <p className="text-center text-black mt-3 mb-8">
          {t("subtitle")}
        </p>

        <div className="bg-white shadow-lg rounded-xl p-6">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            name="village"
            placeholder="Village / Location"
            value={formData.village}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          >
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Bus">Bus</option>
            <option value="Hospital">Hospital</option>
            <option value="Jobs">Jobs</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="problem"
            rows="4"
            placeholder="What problem do you face?"
            value={formData.problem}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <textarea
            name="solution"
            rows="4"
            placeholder="What solution do you suggest?"
            value={formData.solution}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <label className="block mb-2 font-semibold">
            Upload Photo (Optional)
          </label>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button
            onClick={submitIssue}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {t("submit")}
          </button>

        </div>

      </div>
    </div>
  </>
  
  );
}
export default Home;
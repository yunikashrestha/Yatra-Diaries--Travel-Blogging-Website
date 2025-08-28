import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AboutPage = () => (
  <>
    <Navbar />
    <div className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-10">
      <div className="flex flex-col items-center gap-6">
        <img
          src="/llogo.png"
          alt="Yatra Diaries Logo"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">About Yatra Diaries</h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl">
          <span className="font-semibold text-blue-700">Yatra Diaries</span> is your gateway to discovering the beauty, culture, and stories of Nepal and beyond. Our platform brings together passionate travelers, writers, and explorers to share their journeys, experiences, and insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
          <div className="bg-blue-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To inspire and connect people through authentic travel stories, cultural heritage, and adventure. We believe every journey is a story worth sharing.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Curated travel blogs and articles</li>
              <li>Insights into Nepal’s culture, food, and nature</li>
              <li>Community for sharing and discovering journeys</li>
              <li>Easy-to-use platform for writers and readers</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Join Our Community</h3>
          <p className="text-gray-600 mb-4">
            Whether you’re a traveler, writer, or simply curious, Yatra Diaries welcomes you to explore, share, and connect.
          </p>
          <Link
            to="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default AboutPage;
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
      <h1 className="text-white text-4xl font-bold">Welcome to Sports News</h1>
      <p className="text-white text-lg mt-4">Stay updated with the latest sports news and live scores</p>
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/signin"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </Link>
        <Link
          to="/dashboard_"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Continue without Sign In
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

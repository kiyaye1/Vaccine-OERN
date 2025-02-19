import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vaccination System</h1>
        <div>
          <Link to="/login" className="mx-3 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200">Register</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center text-center flex-grow p-10">
        <h2 className="text-4xl font-bold text-gray-800">Get Vaccinated, Stay Protected!</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Join the vaccination program to safeguard yourself and your community.<br />
          Register today and book an appointment at your nearest healthcare center.
        </p>

        <img 
          src="/images/VaccineImage.png" 
          alt="Vaccination Awareness" 
          className="w-1/3 mt-6"
        />

        <div className="mt-6">
          <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

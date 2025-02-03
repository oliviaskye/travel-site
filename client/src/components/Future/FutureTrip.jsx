import React from "react";
import Blog1 from "../../assets/Blog1.jpg";
import Blog2 from "../../assets/Blog2.jpg";
import Blog3 from "../../assets/Blog3.jpg";

function FutureTrip() {
  return (
    <div className="bg-gray-50 py-16" id="inspiration">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Inspiration for Your Next Adventure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="h-56 overflow-hidden">
              <img
                src={Blog1}
                alt="European Ski Destinations"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                10 Best Destinations You Should Visit This Year
              </h3>
              <p className="text-sm text-gray-500">January 06, 2025</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="h-56 overflow-hidden">
              <img
                src={Blog2}
                alt="Beautiful Places"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Booking Travel To The Most Beautiful Places in The World
              </h3>
              <p className="text-sm text-gray-500">January 14, 2025</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="h-56 overflow-hidden">
              <img
                src={Blog3}
                alt="Amazing Countries"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Where Can I Go? 5 Amazing Countries You Must Visit
              </h3>
              <p className="text-sm text-gray-500">January 06, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureTrip;


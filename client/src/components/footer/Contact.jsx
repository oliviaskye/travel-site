import React from "react";
import Nav from "../Nav/Nav";
import Footer from "./Footer"; 

const Contact = () => {
  return (
    <div>
      <div className="bg-gradient-to-br from-beige-200 via-dark-beige-400 to-pink-50 min-h-screen flex flex-col items-center py-10">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl mt-10 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Contact Us
          </h1>
          <small className="block text-gray-500 text-center mb-8">
            We're here to help you with any inquiries!
          </small>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
              <p className="text-gray-700">
                We are final-year students at Ammattiopisto Varia, and for our
                final project, we have developed a hotel booking website as a
                group. If you have any questions, feel free to reach out to us.
                We are happy to discuss our project and provide any additional
                information.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <strong>Ricards's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/ricards-aleksejuks"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ricards Aleksejuks
                </a>
              </div>

              <div>
                <strong>Minoo's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/minoo-yaghoubi-692b42182/"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minoo Yaghoubi
                </a>
              </div>

              <div>
                <strong>Olivia's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/olivia-hinkle-4ba837261"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Olivia Sky
                </a>
              </div>

              <div>
                <strong>Abdullah's LinkedIn:</strong>
                <a
                  href="https://www.linkedin.com/in/abdullah-al-tameemi-b75605325/"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abdullah Altameemi
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;







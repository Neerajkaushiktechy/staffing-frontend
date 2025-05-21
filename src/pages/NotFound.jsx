import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-lg text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;

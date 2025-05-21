import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsMain = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10 text-center">
        Settings
      </h1>
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Manage Settings
        </h2>
        <div className="space-y-6">
          <button
            onClick={() => navigate('/manage-nurse-types')}
            className="w-full py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Manage Nurse Types
          </button>
          {/* Add more settings options here in the future */}
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;
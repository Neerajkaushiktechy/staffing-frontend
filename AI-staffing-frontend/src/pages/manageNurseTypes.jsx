import React, { useState, useEffect } from 'react';
import { get, post, del, put } from '../services/apiServices';
import { addNurseType_url, deleteNurseType_url, getNurseTypes_url, updateNurseType_url } from '../urls/adminUrls';
import { toast } from 'react-toastify';

const ManageNurses = () => {
  const [nurseType, setNurseType] = useState('');
  const [nurseTypes, setNurseTypes] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which nurse type is being edited
  const [editingValue, setEditingValue] = useState(''); // Track the value being edited

  const handleAddNurseType = async () => {
    const data = { nurse_type: nurseType };
    const res = await post(addNurseType_url, data, true);
    if (res.data.status === 200) {
      toast.success('Position added successfully');
      setNurseType('');
      getNursetype(); // Refresh the list after adding
    } else {
      toast.error('An error has occurred');
    }
  };

  const getNursetype = async () => {
    const res = await get(getNurseTypes_url, {}, true);
    if (res.data.status === 200) {
      setNurseTypes(res.data.nurse_types);
    } else {
      toast.error('An error has occurred');
    }
  };

  const handleDeleteNurseType = async (id) => {
    const res = await del(deleteNurseType_url(id), {}, true);
    if (res.data.status === 200) {
      toast.success('Position deleted successfully');
      getNursetype(); // Refresh the list after deletion
    } else {
      toast.error('An error has occurred');
    }
  };

  const handleEditNurseType = (id, currentValue) => {
    setEditingId(id); // Set the ID of the nurse type being edited
    setEditingValue(currentValue); // Prefill the input with the current value
  };

  const handleSaveNurseType = async (id) => {
    const data = { nurse_type: editingValue };
    const res = await put(updateNurseType_url(id), data, true); // Assuming `updateNurseType_url` is the endpoint for updating
    if (res.data.status === 200) {
      toast.success('Position updated successfully');
      setEditingId(null); // Exit editing mode
      getNursetype(); // Refresh the list after updating
    } else {
      toast.error('An error has occurred');
    }
  };

  useEffect(() => {
    getNursetype();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center">Manage Nurse Types</h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Nurse Type</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter nurse type"
              value={nurseType}
              onChange={(e) => setNurseType(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleAddNurseType}
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl mt-10 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Nurse Types</h2>
          {nurseTypes.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {nurseTypes.map((type) => (
                <li
                  key={type.id}
                  className="flex justify-between items-center py-4 px-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {editingId === type.id ? (
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="flex-1 p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSaveNurseType(type.id)}
                        className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)} // Cancel editing
                        className="py-2 px-4 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-800 font-medium flex-1">{type.nurse_type}</span>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditNurseType(type.id, type.nurse_type)}
                          className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNurseType(type.id)}
                          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No nurse types available. Add a new one above.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageNurses;
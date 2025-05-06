import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteFacility_url, getFacilities_url } from '../urls/adminUrls';
import { del, get } from '../services/apiServices';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from 'react-toastify';
export const FacilitiesList = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFacilities();
  }, [currentPage, limit, search]);

  const fetchFacilities = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
      });
      if (search.trim() !== '') {
        queryParams.append('search', search.trim());
      }
  
      const res = await get(`${getFacilities_url}?${queryParams.toString()}`, true);
      setFacilities(res.data.facilities);
      setTotalPages(res.data.pagination.totalPages);
      setTotalItems(res.data.pagination.total);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleEdit = (id) => {
    navigate(`/edit-facility/${id}`);
  };

  const handleDelete = async(id)=>{
    try {
      const res = await del(deleteFacility_url(id), true);
    if(res.data.status === 200){
      toast.success("Facility deleted successfully");
      fetchFacilities();
    }
    } catch (error) {
      console.error("Error deleting Facility:", error);
      toast.error("Failed to delete Facility");
    }
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">Facilities</h1>
      <button
        className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
        onClick={() => navigate('/add-facility')}
      >
        Add Facility
      </button>
      <div className="mb-4 flex items-center gap-3">
  <input
    type="text"
    placeholder="Search facilities..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value)
      setCurrentPage(1);
    } // Reset to first page
    }

    className="w-full md:w-1/3 border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">City, State, Zip</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Overtime Multiplier</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : facilities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No facilities found
                  </td>
                </tr>
              ) : (
                facilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{facility.name}</td>
                    <td className="px-6 py-4">{facility.address}</td>
                    <td className="px-6 py-4">{facility.city_state_zip}</td>
                    <td className="px-6 py-4">{facility.phone}</td>
                    <td className="px-6 py-4">{facility.email}</td>
                    <td className="px-6 py-4">{facility.overtime_multiplier}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                          onClick={() => handleEdit(facility.id)}
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                          onClick={() => handleDelete(facility.id)}
                        >
                          <MdDelete className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={limit}
                onChange={handleLimitChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <span className="text-sm text-gray-700">
              Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalItems)} of {totalItems} entries
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesList;

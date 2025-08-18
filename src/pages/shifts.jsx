import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    deleteShift_url,
    getAllShifts_url,
    sendShiftNotification_url,
} from '../urls/adminUrls';
import { del, get, post } from '../services/apiServices';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { STATUS_TYPES, NURSE_TYPES, SHIFT_TYPES } from '../constants/constant';

import { toast } from 'react-toastify';
import bot_logo from '../assets/bot_logo.png';
import admin_logo from '../assets/admin_logo.png';
import 'react-datepicker/dist/react-datepicker.css';
import { MdClose } from 'react-icons/md'; // for cross icon

const Shifts = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [shifts, setShifts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [nurseTypeFilter, setNurseTypeFilter] = useState('All');
    const [shiftTypeFilter, setShiftTypeFilter] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchAllShift = async () => {
        try {
            setIsLoading(true);
            const queryParams = new URLSearchParams({
                page: currentPage,
                limit,
                search,
                status: statusFilter !== 'All' ? statusFilter : '',
                nurse_type: nurseTypeFilter !== 'All' ? nurseTypeFilter : '',
                shift_type: shiftTypeFilter !== 'All' ? shiftTypeFilter : '',
                start_date: startDate || '',
                end_date: endDate || '',
            });
            const res = await get(`${getAllShifts_url}?${queryParams}`, true);
            setShifts(res.data.shifts);
            setTotalPages(res.data.totalPages);
            setTotalItems(res.data.total);
        } catch (error) {
            console.error('Error fetching shifts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllShift();
    }, [
        currentPage,
        limit,
        search,
        statusFilter,
        nurseTypeFilter,
        shiftTypeFilter,
        startDate,
        endDate,
    ]);

    const handleEdit = async (id) => {
        navigate(`/edit-shift/${id}`);
    };
    const handleDelete = async (id) => {
        try {
            const res = await del(deleteShift_url(id), true);
            if (res.data.status === 200) {
                toast.success('Shift deleted successfully');
                fetchAllShift();
            }
        } catch (error) {
            console.error('Error deleting shift:', error);
            toast.error('Failed to delete shift');
        }
    };

    const handleShiftNotification = async (id) => {
        try {
            const res = await post(
                sendShiftNotification_url,
                { shift_id: id },
                true
            );
            if (res.data.status === 200) {
                toast.success('Shift Notification sent successfully.');
            }
        } catch (error) {
            console.error('Error send notific shift:', error);
            toast.error('Failed to send notifcation shift');
        }
    };
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
        <div className='p-6'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-10'>
                Shifts
            </h1>
            <div className='flex flex-wrap items-center justify-between mb-6 gap-4'>
                <div className='flex flex-wrap gap-3 items-center'>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {STATUS_TYPES.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={nurseTypeFilter}
                        onChange={(e) => {
                            setNurseTypeFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {NURSE_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={shiftTypeFilter}
                        onChange={(e) => {
                            setShiftTypeFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {SHIFT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-wrap gap-3 items-center'>
                    <label className='text-sm text-gray-600'>From:</label>
                    <input
                        type='date'
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <label className='text-sm text-gray-600'>To:</label>
                    <input
                        type='date'
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {(startDate || endDate) && (
                        <MdClose
                            onClick={() => {
                                setStartDate('');
                                setEndDate('');
                                setCurrentPage(1);
                            }}
                            className={`cursor-pointer w-5 h-5 transition 
                                ${
                                    startDate || endDate
                                        ? 'text-gray-500 hover:text-red-600 opacity-100'
                                        : 'opacity-0 pointer-events-none'
                                }
                            `}
                            title='Clear date filter'
                        />
                    )}
                </div>

                <button
                    className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200'
                    onClick={() => navigate('/add-shifts')}
                >
                    Add Shifts
                </button>
            </div>
            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Search shifts...'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on new search
                    }}
                    className='w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            <div className='w-full bg-white rounded-xl shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-sm text-left text-gray-700'>
                        <thead className='bg-gray-100 text-gray-600 uppercase text-xs tracking-wider'>
                            <tr>
                                <th className='px-6 py-4'>Nurse Name</th>
                                <th className='px-6 py-4'>Nurse Type</th>
                                <th className='px-6 py-4'>Shift Type</th>
                                <th className='px-6 py-4'>Date</th>
                                <th className='px-6 py-4'>Shift Status</th>
                                <th className='px-6 py-4'>Facility Name</th>
                                <th className='px-6 py-4'>Coordinator Name</th>
                                <th className='px-6 py-4'>Booked By</th>
                                <th className='px-6 py-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan='10'
                                        className='px-6 py-4 text-center'
                                    >
                                        <div className='flex justify-center'>
                                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : shifts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan='10'
                                        className='px-6 py-4 text-center text-gray-500'
                                    >
                                        No shifts found
                                    </td>
                                </tr>
                            ) : (
                                shifts.map((shift) => (
                                    <tr
                                        key={shift.id}
                                        className={`hover:bg-gray-50 transition-colors ${
                                            (!shift.nurse_name ||
                                                shift.nurse_name.trim() ===
                                                    '') &&
                                            shift.status === 'open'
                                                ? 'bg-red-100 hover:bg-red-100'
                                                : ''
                                        }`}
                                    >
                                        <td className='px-6 py-4'>
                                            {shift.nurse_name &&
                                            shift.nurse_name.trim() !== ''
                                                ? shift.nurse_name
                                                : '--'}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.nurse_type}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.shift}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.date
                                                ? new Date(shift.date)
                                                      .toLocaleDateString(
                                                          'en-GB'
                                                      )
                                                      .replace(/\//g, '-')
                                                : '—'}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.status}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.facility_name}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.coordinator_name}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {shift.booked_by === 'bot' ? (
                                                <img
                                                    className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                                                    src={bot_logo}
                                                    alt='nurses logo'
                                                ></img>
                                            ) : (
                                                <img
                                                    className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                                                    src={admin_logo}
                                                    alt='nurses logo'
                                                ></img>
                                            )}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center space-x-4'>
                                                <button
                                                    className='p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors'
                                                    onClick={() =>
                                                        handleEdit(shift.id)
                                                    }
                                                >
                                                    <FaEdit className='w-5 h-5' />
                                                </button>
                                                <button
                                                    className='p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors'
                                                    onClick={() =>
                                                        handleDelete(shift.id)
                                                    }
                                                >
                                                    <MdDelete className='w-5 h-5' />
                                                </button>
                                                {shift.status === 'open' && (
                                                    <button
                                                        className='relative p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-full transition duration-300'
                                                        onClick={() =>
                                                            handleShiftNotification(
                                                                shift.id
                                                            )
                                                        }
                                                    >
                                                        <MdNotificationsActive className='w-5 h-5 animate-pulse' />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className='flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200'>
                    <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-2'>
                            <span className='text-sm text-gray-700'>Show</span>
                            <select
                                value={limit}
                                onChange={handleLimitChange}
                                className='border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                            </select>
                            <span className='text-sm text-gray-700'>
                                entries
                            </span>
                        </div>
                        <span className='text-sm text-gray-700'>
                            Showing {(currentPage - 1) * limit + 1} to{' '}
                            {Math.min(currentPage * limit, totalItems)} of{' '}
                            {totalItems} entries
                        </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-full ${
                                currentPage === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <FaChevronLeft className='w-5 h-5' />
                        </button>
                        <span className='text-sm text-gray-700'>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-full ${
                                currentPage === totalPages
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <FaChevronRight className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Shifts;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { del, get, put } from '../services/apiServices';
import {
    getFacilityById_url,
    editFacility_url,
    getNurseType_url,
    deleteService_url,
    deleteCoordinator_url,
} from '../urls/adminUrls';
import { toast } from 'react-toastify';
import { Loader } from '../components/loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const EditFacility = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nurses, setNurses] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [multiplier, setMultiplier] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [nurseType, setNurseType] = useState([]);
    const [coordinators, setCoordinators] = useState([]);
    const [cityStateZip, setCityStateZip] = useState('');
    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Fetch facility data
            const facilityRes = await get(getFacilityById_url(id), true);
            console.log('Facility Data:', facilityRes.data);
            const facilityData = facilityRes.data.facilities;
            const nurses_array = facilityRes.data.services;
            const coordinators_array = facilityRes.data.coordinators;
            // Set facility data
            setName(facilityData.name || '');
            setAddress(facilityData.address || '');
            setCityStateZip(facilityData.city_state_zip || '');
            setMultiplier(facilityData.overtime_multiplier || 0);

            // Transform nurses data to match the expected format
            const transformedNurses = nurses_array.map((nurse) => ({
                nurseType: nurse.role,
                amTimeStart: nurse.am_time_start || '',
                amTimeEnd: nurse.am_time_end || '',
                pmTimeStart: nurse.pm_time_start || '',
                pmTimeEnd: nurse.pm_time_end || '',
                nocTimeStart: nurse.noc_time_start || '',
                nocTimeEnd: nurse.noc_time_end || '',
                amMealStart: nurse.am_meal_start || '',
                amMealEnd: nurse.am_meal_end || '',
                pmMealStart: nurse.pm_meal_start || '',
                pmMealEnd: nurse.pm_meal_end || '',
                nocMealStart: nurse.noc_meal_start || '',
                nocMealEnd: nurse.noc_meal_end || '',
                rate: nurse.rate || '',
            }));
            setNurses(transformedNurses);
            const transformedCoordinators = coordinators_array.map(
                (coordinator) => ({
                    id: coordinator.id || '',
                    firstName: coordinator.coordinator_first_name || '',
                    lastName: coordinator.coordinator_last_name || '',
                    email: coordinator.coordinator_email || '',
                    phone: coordinator.coordinator_phone || '',
                })
            );
            setCoordinators(transformedCoordinators);
            // Fetch nurse types
            const nurseTypeRes = await get(getNurseType_url, true);
            setNurseType(nurseTypeRes.data.nurse_types);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load facility data');
            navigate('/facilities');
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (
            !name ||
            !address ||
            !cityStateZip ||
            multiplier === undefined ||
            multiplier === null
        ) {
            toast.error('Please fill out all facility fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{6,14}$/;
        for (const coordinator of coordinators) {
            if (coordinator.email) {
                if (!emailRegex.test(coordinator.email)) {
                    toast.error('Please enter a valid email address.');
                    return;
                }
            }
            if (coordinator.phone) {
                if (!phoneRegex.test(coordinator.phone)) {
                    toast.error('Please enter a valid phone number.');
                    return;
                }
            }
        }
        if (nurses.length === 0) {
            toast.error('Please select at least one nurse type.');
            return;
        }

        for (const nurse of nurses) {
            const requiredFields = [
                nurse.nurseType,
                nurse.amTimeStart,
                nurse.amTimeEnd,
                nurse.pmTimeStart,
                nurse.pmTimeEnd,
                nurse.nocTimeStart,
                nurse.nocTimeEnd,
                nurse.amMealStart,
                nurse.amMealEnd,
                nurse.pmMealStart,
                nurse.pmMealEnd,
                nurse.nocMealStart,
                nurse.nocMealEnd,
                nurse.rate,
            ];
            if (requiredFields.some((field) => !field)) {
                toast.error('Please fill out all nurse shift fields.');
                return;
            }
        }
        if (coordinators.length === 0) {
            toast.error('Please add at least one coordinator.');
            return;
        }
        for (const coordinator of coordinators) {
            const requiredFields = [
                coordinator.firstName,
                coordinator.lastName,
                coordinator.email,
                coordinator.phone,
            ];
            if (requiredFields.some((field) => !field)) {
                toast.error('Please fill out all coordinator fields.');
                return;
            }
        }

        const formData = {
            name,
            address,
            cityStateZip,
            multiplier,
            nurses: nurses.map((nurse) => ({ ...nurse })),
            coordinators: coordinators.map((coordinator) => ({
                ...coordinator,
                phone: coordinator.phone.startsWith('+')
                    ? coordinator.phone
                    : `+${coordinator.phone}`,
            })),
        };
        setIsLoading(true);
        try {
            const res = await put(editFacility_url(id), formData, true);
            if (res.data.status === 200) {
                toast.success('Facility updated successfully');
                navigate(`/facilities`);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 'Failed to update facility'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleNurseChange = (index, field, value) => {
        const updated = [...nurses];
        if (field === 'rate') {
            const regex = /^\d*\.?\d{0,3}$/;
            if (value === '' || regex.test(value)) {
                updated[index][field] = value;
            }
        } else {
            updated[index][field] = value;
        }
        setNurses(updated);
    };

    const handleToggleNurseType = async (type) => {
        const exists = nurses.find((n) => n.nurseType === type);

        if (exists) {
            handleDeleteService(id, type);
        } else {
            // Add the nurse type when the checkbox is checked
            setNurses((prev) => [
                ...prev,
                {
                    nurseType: type,
                    amTimeStart: '',
                    amTimeEnd: '',
                    pmTimeStart: '',
                    pmTimeEnd: '',
                    nocTimeStart: '',
                    nocTimeEnd: '',
                    amMealStart: '',
                    amMealEnd: '',
                    pmMealStart: '',
                    pmMealEnd: '',
                    nocMealStart: '',
                    nocMealEnd: '',
                    rate: '',
                },
            ]);
        }
    };
    const handleCoordinatorDelete = async (id, index) => {
        if (!id) {
            // Frontend-only deletion for unsaved coordinators
            const updatedCoordinators = coordinators.filter(
                (_, i) => i !== index
            );
            setCoordinators(updatedCoordinators);
            toast.success('Coordinator removed successfully');
        } else {
            // Backend deletion for saved coordinators
            try {
                const res = await del(deleteCoordinator_url(id), true);
                if (res.data.status === 200) {
                    toast.success('Coordinator removed successfully');
                    // Remove the coordinator from the frontend state
                    const updatedCoordinators = coordinators.filter(
                        (_, i) => i !== index
                    );
                    setCoordinators(updatedCoordinators);
                } else {
                    toast.error('Failed to remove coordinator');
                }
            } catch (error) {
                console.error('Error removing coordinator:', error);
                toast.error('Failed to remove coordinator');
            }
        }
    };
    const handleDeleteService = async (id, role) => {
        try {
            const res = await del(deleteService_url(id, role), true);
            if (res.data.status === 200) {
                toast.success('Service removed successfully');
                fetchData();
            }
        } catch (error) {
            console.error('Error removing service:', error);
            toast.error('Failed to removing service');
        }
    };
    if (isLoading) {
        return <Loader />;
    }
    const handleInputChange = (index, field, value) => {
        const updatedCoordinators = [...coordinators];
        updatedCoordinators[index][field] = value;
        setCoordinators(updatedCoordinators);
    };
    return (
        <div className='flex flex-col justify-center items-center pt-10 w-full px-4'>
            <h1 className='text-4xl md:text-5xl font-bold mb-10'>
                Edit Facility
            </h1>

            <div className='w-full max-w-5xl space-y-6'>
                <div className='space-y-2'>
                    <label className='text-gray-700 font-medium'>
                        Facility Name
                    </label>
                    <input
                        type='text'
                        placeholder='Facility Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='space-y-2'>
                    <label className='text-gray-700 font-medium'>Address</label>
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-2 space-y-2'>
                        <label className='text-gray-700 font-medium'>
                            City, State, ZIP
                        </label>
                        <input
                            type='text'
                            placeholder='Enter City, State, ZIP (e.g., Los Angeles, CA 90001)'
                            value={cityStateZip}
                            onChange={(e) => setCityStateZip(e.target.value)}
                            className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-gray-700 font-medium'>
                            Multiplier
                        </label>
                        <input
                            type='number'
                            placeholder='Multiplier'
                            value={multiplier}
                            onChange={(e) => setMultiplier(e.target.value)}
                            className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[46px]'
                        />
                    </div>
                </div>
                <button
                    className='mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200'
                    onClick={() =>
                        setCoordinators([
                            ...coordinators,
                            {
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                            },
                        ])
                    }
                >
                    Add Coordinator
                </button>
                {coordinators.map((coordinator, index) => (
                    <div
                        key={index}
                        className='relative w-full max-w-5xl mt-12 border-t pt-10 space-y-8'
                    >
                        <button
                            onClick={() =>
                                handleCoordinatorDelete(coordinator.id, index)
                            }
                            className='absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition'
                        >
                            Delete
                        </button>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-gray-700 font-medium'>
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Coordinator First Name'
                                    value={coordinator.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            'firstName',
                                            e.target.value
                                        )
                                    }
                                    className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-gray-700 font-medium'>
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Coordinator Last Name'
                                    value={coordinator.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            'lastName',
                                            e.target.value
                                        )
                                    }
                                    className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-gray-700 font-medium'>
                                    Phone Number
                                </label>
                                <PhoneInput
                                    country={'us'}
                                    value={coordinator.phone}
                                    onChange={(phone) =>
                                        handleInputChange(index, 'phone', phone)
                                    }
                                    inputClass='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 h-[46px] rounded-r-xl'
                                    buttonClass='bg-blue-50 border border-blue-300 rounded-l-xl hover:bg-blue-100 h-[46px]'
                                    containerClass='w-full h-[46px]'
                                    dropdownClass='bg-white border border-blue-300 rounded-xl shadow-lg'
                                    searchClass='p-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    searchPlaceholder='Search country...'
                                    inputProps={{
                                        className:
                                            'w-full h-full bg-blue-50 border border-blue-300 text-blue-900 text-base pl-12 h-[46px] rounded-r-xl',
                                    }}
                                    buttonProps={{
                                        className:
                                            'bg-blue-50 border border-blue-300 border-r-0 rounded-l-xl h-[46px]',
                                    }}
                                    dropdownProps={{
                                        className:
                                            'bg-white border border-blue-300 rounded-xl shadow-lg',
                                    }}
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-gray-700 font-medium'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    value={coordinator.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                ))}
            </div>

            <div className='w-full max-w-5xl mt-10 space-y-4'>
                <h2 className='text-xl font-semibold'>Select Service Types</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {nurseType.map((type, i) => (
                        <label key={i} className='flex items-center space-x-2'>
                            <input
                                type='checkbox'
                                checked={
                                    !!nurses.find(
                                        (n) => n.nurseType === type.nurse_type
                                    )
                                }
                                onChange={() =>
                                    handleToggleNurseType(type.nurse_type)
                                }
                            />
                            <span>{type.nurse_type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {nurses.map((nurse, index) => (
                <div
                    key={index}
                    className='w-full max-w-5xl mt-12 border-t pt-10 space-y-8'
                >
                    <h3 className='text-lg font-semibold mb-4 flex items-center justify-between'>
                        Enter Details for {nurse.nurseType} Nurse
                    </h3>
                    {nurse.nurseType && (
                        <>
                            {/* Shifts */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {['AM', 'PM', 'NOC'].map((shift) => (
                                    <div key={shift}>
                                        <label className='text-gray-700 font-medium'>
                                            {shift} Start
                                        </label>
                                        <input
                                            type='time'
                                            value={
                                                nurse[
                                                    `${shift.toLowerCase()}TimeStart`
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleNurseChange(
                                                    index,
                                                    `${shift.toLowerCase()}TimeStart`,
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 mb-2 rounded-xl bg-blue-50 border border-blue-300'
                                        />
                                        <label className='text-gray-700 font-medium'>
                                            {shift} End
                                        </label>
                                        <input
                                            type='time'
                                            value={
                                                nurse[
                                                    `${shift.toLowerCase()}TimeEnd`
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleNurseChange(
                                                    index,
                                                    `${shift.toLowerCase()}TimeEnd`,
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300'
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Meals */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                                {['AM', 'PM', 'NOC'].map((shift) => (
                                    <div key={shift}>
                                        <label className='text-gray-700 font-medium'>
                                            {shift} Meal Start
                                        </label>
                                        <input
                                            type='time'
                                            value={
                                                nurse[
                                                    `${shift.toLowerCase()}MealStart`
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleNurseChange(
                                                    index,
                                                    `${shift.toLowerCase()}MealStart`,
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 mb-2 rounded-xl bg-blue-50 border border-blue-300'
                                        />
                                        <label className='text-gray-700 font-medium'>
                                            {shift} Meal End
                                        </label>
                                        <input
                                            type='time'
                                            value={
                                                nurse[
                                                    `${shift.toLowerCase()}MealEnd`
                                                ]
                                            }
                                            onChange={(e) =>
                                                handleNurseChange(
                                                    index,
                                                    `${shift.toLowerCase()}MealEnd`,
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 rounded-xl bg-blue-50 border border-blue-300'
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Rate */}
                            <div className='mt-6 grid grid-cols-1 md:grid-cols-3'>
                                <div>
                                    <label className='text-gray-700 font-medium'>
                                        Rate
                                    </label>
                                    <div className='relative'>
                                        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
                                            $
                                        </span>
                                        <input
                                            type='text'
                                            placeholder='0.000'
                                            value={nurse.rate}
                                            onChange={(e) =>
                                                handleNurseChange(
                                                    index,
                                                    'rate',
                                                    e.target.value
                                                )
                                            }
                                            className='w-full p-3 pl-8 rounded-xl bg-blue-50 border border-blue-300'
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <div className='flex flex-col items-center w-full max-w-5xl gap-4 mt-12'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <button
                        onClick={handleSubmit}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold mb-5">
            Update Facility
           </button>
        )}
      </div>
    </div>
  );
};

export default EditFacility;
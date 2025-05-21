import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { get, put } from '../services/apiServices';
import {
  editShift_url,
  getAvailableNurses_url,
  getCoordinatorsByFacility_url,
  getFacilities_url,
  getNurseById_url,
  getNurseType_url,
  getShiftDetailsById_url
} from '../urls/adminUrls';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditShift = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [shift, setShift] = useState('');
  const [nurseTypes, setNurseType] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [facility, setFacility] = useState('');
  const [coordinators, setCoordinators] = useState([]);
  const [coordinator, setCoordinator] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [nurses, setNurses] = useState([]);
  const [nurse, setNurse] = useState('');
  const [assignedNurse, setAssignedNurse] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const inputStyle =
    'w-full p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const today = new Date().toISOString().split('T')[0];
  const allNurses = assignedNurse
  ? [assignedNurse, ...nurses.filter((n) => n.id !== assignedNurse.id)]
  : nurses;
  const getNurseType = async () => {
    const res = await get(getNurseType_url, true);
    setNurseType(res.data.nurse_types);
  };

  const getFacilities = async () => {
    const res = await get(getFacilities_url, true);
    if (res.data.status === 200) {
      setFacilities(res.data.facilities);
    } else {
      toast.error('An error has occurred');
    }
  };

  useEffect(() => {
    getNurseType();
    getFacilities();
  }, []);

useEffect(() => {
  const fetchCoordinators = async () => {
    if (facility) {
      try {
        const res = await get(getCoordinatorsByFacility_url(facility), true);
        setCoordinators(res.data.coordinators);

        // Auto-select the first coordinator if available
        if (res.data.coordinators.length > 0) {
          setCoordinator(res.data.coordinators[0].id.toString());
        } else {
          setCoordinator('');
          setEmail('');
          setPhone('');
        }
      } catch (error) {
        console.error('Error fetching coordinators:', error);
      }
    } else {
      setCoordinators([]);
      setCoordinator('');
      setEmail('');
      setPhone('');
    }
  };

  fetchCoordinators();
}, [facility]);

// Update phone and email when coordinator or coordinators change
useEffect(() => {
  if (coordinator && coordinators.length > 0) {
    const selected = coordinators.find((c) => c.id.toString() === coordinator.toString());
    if (selected) {
      setEmail(selected.coordinator_email);
      setPhone(selected.coordinator_phone);
    } else {
      setEmail('');
      setPhone('');
    }
  } else {
    setEmail('');
    setPhone('');
  }
}, [coordinator, coordinators]);

  const fetchAvailableNurses = async () => {
    if (facility && position && scheduleDate && shift) {
      const res = await get(
        `${getAvailableNurses_url}?facility_id=${facility}&nurse_type=${position}&date=${scheduleDate}&shift=${shift}`,
        true
      );
      console.log("NURSE AVAILABLE",res);
      if (res.data.status === 200) {
        setNurses(res.data.nurses);
      }
    }
  };

  const handleCoordinatorChange = (e) => {
    const selectedId = e.target.value;
    setCoordinator(selectedId);
  };

  const handleEditShift = async () => {
    if (!facility || !coordinator || !email || !phone || !position || !scheduleDate || !nurse || !shift) {
      toast.error('Please fill all shift fields');
      return;
    }

    const formData = {
      facility,
      coordinator,
      position,
      scheduleDate,
      nurse,
      shift,
      additionalNotes
    };

    try {
      const res = await put(editShift_url(id), formData, true);
      if (res.data.status === 200) {
        navigate('/shifts');
        toast.success('Shift added successfully');
        setFacilities([]);
        setFacility('');
        setCoordinators([]);
        setCoordinator('');
        setEmail('');
        setPhone('');
        setPosition('');
        setScheduleDate('');
        setNurses([]);
        setNurse('');
        setShift('');
        setAdditionalNotes('');
      } else {
        toast.error('An error has occurred');
      }
    } catch (error) {
      console.error('Error adding shift:', error);
      toast.error('Failed to add shift');
    }
  };

  useEffect(() => {
    fetchAvailableNurses();
  }, [facility, position, scheduleDate, shift]);

  const getShiftDetailsById = async () => {
    try {
      const res = await get(getShiftDetailsById_url(id), true);
      if (res.data.status === 200) {
        const shift = res.data.shift;

        // Set facility, position, and other details
        setFacility(shift.facility_id);
        setPosition(shift.nurse_type);

        // Format and set the schedule date
        const localDate = new Date(shift.date);
        const date = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
        setScheduleDate(date);

        // Set nurse and shift details
        setNurse(shift.nurse_id);
        setShift(shift.shift);
        setAdditionalNotes(shift.additional_instructions);
        // Set coordinator
        setCoordinator(shift.coordinator_id);

        // Fetch assigned nurse details if nurse_id exists
        if (shift.nurse_id) {
          const nurseRes = await get(getNurseById_url(shift.nurse_id), true);
          if (nurseRes.data.status === 200) {
            setAssignedNurse(nurseRes.data.nurseData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching shift details:', error);
    }
  };

  useEffect(() => {
    getShiftDetailsById();
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 w-full px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Edit Shift</h1>
      <div className="w-full max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Facilities</label>
            <select value={facility} onChange={(e) => setFacility(e.target.value)} className={inputStyle}>
              <option value="" disabled>
                Select Facility
              </option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Coordinators</label>
            <select value={coordinator} onChange={handleCoordinatorChange} className={inputStyle}>
              <option value="" disabled>
                Select Coordinator
              </option>
              {coordinators.map((coordinator) => (
                <option key={coordinator.id} value={coordinator.id}>
                  {coordinator.coordinator_first_name} {coordinator.coordinator_last_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={() => {}}
              disabled
              inputClass="!w-full !h-[46px] !p-3 !pl-12 !rounded-lg !bg-blue-50 !border !border-blue-300 !focus:outline-none"
              buttonClass="!h-[46px] !bg-blue-50 !border !border-blue-300 !rounded-l-lg"
              containerClass="!w-full"
              dropdownClass="!bg-white !border !border-blue-300 !rounded-lg !shadow-lg"
              searchClass="!p-2 !border-b !border-blue-200"
              searchPlaceholder="Search country..."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" placeholder="Enter email" value={email} readOnly className={inputStyle} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Position</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)} className={inputStyle}>
              <option value="" disabled>
                Select position
              </option>
              {nurseTypes.map((type) => (
                <option key={type.id} value={type.nurse_type}>
                  {type.nurse_type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Schedule Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={today}
              className={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Shift</label>
            <select value={shift} onChange={(e) => setShift(e.target.value)} className={inputStyle}>
              <option value="" disabled>
                Select Shift
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
              <option value="NOC">NOC</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Nurses</label>
            <select value={nurse} onChange={(e) => setNurse(e.target.value)} className={inputStyle}>
              <option value="" disabled>
                Select Nurse
              </option>
              {allNurses.map((nurse) => (
                <option key={nurse.id} value={nurse.id}>
                  {nurse.first_name} {nurse.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>
                <div>
          <label className="block mb-1 font-medium">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Enter any additional notes..."
            className={`${inputStyle} h-32 resize-none`}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
            onClick={handleEditShift}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShift;


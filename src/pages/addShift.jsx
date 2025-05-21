import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { post,get } from '../services/apiServices';
import { addShift_url,getAvailableNurses_url,getCoordinatorsByFacility_url,getFacilities_url,getNurseType_url } from '../urls/adminUrls';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
const AddShift = () => {
  const navigate = useNavigate();
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
  const [additionalNotes, setAdditionalNotes] = useState('');
  const inputStyle =
    'w-full p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const getNurseType = async ()=>{
      const res = await get(getNurseType_url,true)
      setNurseType(res.data.nurse_types)
    }
    useEffect(() => {
      getNurseType();
      getFacilities();
    }, []);
    const getFacilities = async () => {
        const res = await get(getFacilities_url, true);
        if (res.data.status === 200) {
            setFacilities(res.data.facilities);
            }
        else {
            toast.error('An error has occurred');
        }
    }
    const getCoordinatorsByFacility = async () => {
        try {
            const res = await get(getCoordinatorsByFacility_url(facility),true)
            setCoordinators(res.data.coordinators)
        } catch (error) {
            console.error("Error fetching coordinators:", error);
        }
    }

    useEffect(() => {
        if (facility) {
              setCoordinator('');
    setEmail('');
    setPhone('');
          getCoordinatorsByFacility();
        }
      }, [facility]);
    
    const fetchAvailableNurses = async () => {
        if (facility, position, scheduleDate, shift){
            const res = await get(`${getAvailableNurses_url}?facility_id=${facility}&nurse_type=${position}&date=${scheduleDate}&shift=${shift}`, true);
            if (res.data.status === 200) {
                setNurses(res.data.nurses);
            }
        }
    }
    const handleCoordinatorChange = (e) => {
        const selectedId = e.target.value;
        setCoordinator(selectedId);
        const selected = coordinators.find(c => c.id == selectedId);
        console.log("SELECTED",selected);
        if (selected) {
          setEmail(selected.coordinator_email);
          setPhone(selected.coordinator_phone);
        } else {
          setEmail('');
          setPhone('');
        }
      };
  const handleAddShift = async () => {


    if (!facility || !coordinator || !email || !phone  || !position || !scheduleDate || !nurse || !shift) {
      toast.error("Please fill all shift fields");
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
      const res = await post(addShift_url, formData, true);
      if (res.data.status === 200) {
        navigate('/shifts');
        toast.success("Shift added successfully");
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
      } 
      else {
        toast.error("An error has occurred");
      }
    } catch (error) {
      console.error("Error adding shift:", error);
      toast.error("Failed to add shift");
    }
  };
  useEffect(() => {
    fetchAvailableNurses();
  },[facility, position, scheduleDate, shift]);
  return (
    <div className="flex flex-col items-center pt-10 w-full px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Add Shift</h1>
      <div className="w-full max-w-4xl space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
      <label className="block mb-1 font-medium">Facilities</label>
      <select
        value={facility}
        onChange={(e) => setFacility(e.target.value)}
        className={inputStyle}
      >
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
      <select
        value={coordinator}
        onChange={handleCoordinatorChange}
        className={inputStyle}
      >
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

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
  <div>
    <label className="block mb-1 font-medium">Phone</label>
    <PhoneInput
      country={'us'}
      value={phone}
      onChange={() => {}} // prevent changes
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
    <input
      type="email"
      placeholder="Enter email"
      value={email}
      readOnly
      className={inputStyle}
    />
  </div>
</div>

        {/* Position and Schedule Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
      <label className="block mb-1 font-medium">Position</label>
      <select
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className={inputStyle}
      >
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

        {/* Rate and Shift Dif */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
      <label className="block mb-1 font-medium">Shift</label>
      <select
        value={shift}
        onChange={(e) => setShift(e.target.value)}
        className={inputStyle}
      >
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
      <select
        value={nurse}
        onChange={(e) => setNurse(e.target.value)}
        className={inputStyle}
      >
        <option value="" disabled>
          Select Nurse
        </option>
      {nurses.map((nurse) => (
          <option key={nurse.id} value={nurse.id}>
            {nurse.first_name} {nurse.last_name}
          </option>
        ))}
      </select>
    </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block mb-1 font-medium">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Enter any additional notes..."
            className={`${inputStyle} h-32 resize-none`}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
            onClick={handleAddShift}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddShift;

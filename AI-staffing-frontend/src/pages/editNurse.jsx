import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, put } from '../services/apiServices';
import { getNurseById_url, editNurse_url } from '../urls/adminUrls';
import { toast } from 'react-toastify';
import { Loader } from '../components/loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditNurse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [rate, setRate] = useState(0);
  const [shiftDif, setShiftDif] = useState(0);
  const [otRate, setOtRate] = useState(0);
  const [email, setEmail] = useState('');
  const [talentId, setTalentId] = useState(0);
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [shift, setShift] = useState('');
  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        setIsLoading(true);
        const res = await get(getNurseById_url(id), true);
        const nurseData = res.data.nurseData;

        setFirstName(nurseData.first_name || '');
        setLastName(nurseData.last_name || '');
        setScheduleName(nurseData.schedule_name || '');
        setRate(nurseData.rate || 0);
        setShiftDif(nurseData.shift_dif || 0);
        setOtRate(nurseData.ot_rate || 0);
        setEmail(nurseData.email || '');
        setTalentId(nurseData.talent_id || 0);
        setPosition(nurseData.nurse_type || '');
        setPhone(nurseData.mobile_number || '');
        setLocation(nurseData.location || '');
        setShift(nurseData.shift || '');
      } catch (error) {
        console.error("Error fetching nurse data:", error);
        toast.error("Failed to load nurse data");
        navigate('/nurses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNurseData();
  }, [id, navigate]);

  const handleUpdateNurse = async () => {
    // Email and phone validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;

    if (!firstName || !lastName || !scheduleName || !rate || !shiftDif || !otRate || !email || !talentId || !position || !phone || !location || !shift) {
      toast.error("Please fill all nurse fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const formData = {
      firstName,
      lastName,
      scheduleName,
      rate,
      shiftDif,
      otRate,
      email,
      talentId,
      position,
      phone: phone.startsWith('+') ? phone : `+${phone}`,
      location,
      shift,
    };

    try {
      setIsLoading(true);
      const res = await put(editNurse_url(id), formData, true);

      if (res.data.status === 200) {
        toast.success("Nurse updated successfully");
        navigate(`/nurses`);
      } else {
        toast.error("An error has occurred");
      }
    } catch (error) {
      console.error("Error updating nurse:", error);
      toast.error("Failed to update nurse");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = 'w-full p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500';

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center pt-10 w-full px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Edit Nurse</h1>
      <div className="w-full max-w-4xl space-y-6">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={setPhone}
              inputClass="!w-full !h-[46px] !p-3 !pl-12 !rounded-lg !bg-blue-50 !border !border-blue-300 !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
              buttonClass="!h-[46px] !bg-blue-50 !border !border-blue-300 !rounded-l-lg !hover:bg-blue-100"
              containerClass="!w-full"
              dropdownClass="!bg-white !border !border-blue-300 !rounded-lg !shadow-lg"
              searchClass="!p-2 !border-b !border-blue-200 !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
              searchPlaceholder="Search country..."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Position and Schedule Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Position</label>
            <input
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Schedule Name</label>
            <input
              type="text"
              placeholder="Enter schedule name"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Rate and Shift Dif */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Rate</label>
            <input
              type="number"
              placeholder="Enter rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Shift Dif</label>
            <input
              type="number"
              placeholder="Enter shift dif"
              value={shiftDif}
              onChange={(e) => setShiftDif(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
        </div>

        {/* OT Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">OT Rate</label>
            <input
              type="number"
              placeholder="Enter OT rate"
              value={otRate}
              onChange={(e) => setOtRate(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Talent ID</label>
            <input
              type="number"
              placeholder="Enter Talent ID"
              value={talentId}
              onChange={(e) => setTalentId(Number(e.target.value))}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation((e.target.value))}
              className={inputStyle}
            />
          </div> 
          <div>
            <label className="block mb-1 font-medium">Shift</label>
            <input
              type="text"
              placeholder="Enter shift"
              value={shift}
              onChange={(e) => setShift((e.target.value))}
              className={inputStyle}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
            onClick={handleUpdateNurse}
          >
            Update Nurse
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNurse;
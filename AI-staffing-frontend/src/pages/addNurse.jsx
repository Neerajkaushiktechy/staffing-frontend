import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { post } from '../services/apiServices';
import { addNurse_url } from '../urls/adminUrls';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const AddNurse = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [rate, setRate] = useState(0);
  const [shiftDif, setShiftDif] = useState(0);
  const [otRate, setOtRate] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [talentId, setTalentId] = useState(0);
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');

  const inputStyle =
    'w-full p-3 rounded-lg bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const handleAddNurse = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;


    if (!firstName || !lastName || !scheduleName || !rate || !shiftDif || !otRate || !email || !phone || !talentId || !position) {
      toast.error("Please fill all nurse fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
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
      phone: phone.startsWith('+') ? phone : `+${phone}`,
      talentId,
      position,
      location
    };

    try {
      const res = await post(addNurse_url, formData, true);
      if (res.data.status === 200) {
        toast.success("Nurse added successfully");
        setFirstName('');
        setLastName('');
        setScheduleName('');
        setRate(0);
        setShiftDif(0);
        setOtRate(0);
        setEmail('');
        setPhone('');
        setTalentId(0);
        setPosition('');
        setLocation('');
      } else {
        toast.error("An error has occurred");
      }
    } catch (error) {
      console.error("Error adding nurse:", error);
      toast.error("Failed to add nurse");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 w-full px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-8">Add Nurse</h1>
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
              inputClass="!w-full !h-[46px] !p-3 !rounded-lg !bg-blue-50 !border !border-blue-300 !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
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

        {/* OT Rate and Talent ID */}
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
        </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
            onClick={handleAddNurse}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNurse;

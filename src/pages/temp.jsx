import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, put } from '../services/apiServices';
import { getNurseById_url, editNurse_url } from '../urls/adminUrls';
import { toast } from 'react-toastify';
import { Loader } from '../components/loader';

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
  const [isLoading, setIsLoading] = useState(false);

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
    if (!firstName || !lastName || !scheduleName || !rate || !shiftDif || !otRate || !email || !talentId || !position) {
      toast.error("Please fill all nurse fields");
      return;
    }

    const formData = {
      firstName: firstName,
      lastName: lastName,
      scheduleName: scheduleName,
      rate: rate,
      shiftDif:shiftDif,
      otRate:otRate,
      email:email,
      talentId:talentId,
      position:position
    };

    try {
      setIsLoading(true);
      const res = await put(editNurse_url(id), formData, true);
      
      if (res.data.status === 200) {
        toast.success("Nurse updated successfully");
        navigate(`/edit-nurse/${id}`);
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
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getShifts_url, getFacilities_url, getNurseTypes_url } from '../urls/adminUrls';
import { get } from '../services/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
const BookingCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [nurseType, setNurseType] = useState('');
  const [facility, setFacility] = useState('');
  const [status, setStatus] = useState('');
  const [shift, setShift] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [nurseTypes, setNurseTypes] = useState([]);
  const fetchShifts = async () => {
    const params = new URLSearchParams();
    if (nurseType) params.append('nurseType', nurseType);
    if (facility) params.append('facility', facility);
    if (status) params.append('status', status);
    if (shift) params.append('shift', shift);
    const res = await get(getShifts_url(params),true);
    const data = await res.data.events;
    setEvents(data);
  };
  const fetchFacilities = async () => {
    const res = await get(`${getFacilities_url}?noPagination=true`, true);
    if (res.data.status === 200) {
        setFacilities(res.data.facilities);
        }
    else {
        toast.error('An error has occurred');
    }
  }
  const getNursetype = async () => {
    const res = await get(getNurseTypes_url, {}, true);
    if (res.data.status === 200) {
      setNurseTypes(res.data.nurse_types);
    } else {
      toast.error('An error has occurred');
    }
  };
  useEffect(() => {
    fetchShifts();
    fetchFacilities();
    getNursetype();
  }, [nurseType, facility, status, shift]);

  function renderEventContent(eventInfo) {
    const { title } = eventInfo.event;
    const {shift} = eventInfo.event.extendedProps;
  
    const startTime = eventInfo.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = eventInfo.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nurse = eventInfo.event.extendedProps.nurse;
    return (
      <div className="p-1 text-sm">
        <b>{title}</b><br />
        <b>{nurse}</b><br />
        <span>{shift} | {startTime} - {endTime}</span>
      </div>
    );
  }
  return (
    <div>
      <div className="filters p-4 bg-gray-100 rounded-md shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nurseTypes.length > 0 && (
            <div>
              <label htmlFor="nurseType" className="block text-sm font-medium text-gray-700 mb-1">
                Nurse Type
              </label>
              <select
                id="nurseType"
                value={nurseType}
                onChange={e => setNurseType(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Nurse Types</option>
                {nurseTypes.map((type) => (
                  <option key={type.id} value={type.nurse_type}>
                    {type.nurse_type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {facilities.length > 0 && (
            <div>
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-1">
                Facility
              </label>
              <select
                id="facility"
                value={facility}
                onChange={e => setFacility(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Facilities</option>
                {facilities.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-1">
              Shift
            </label>
            <select
              id="shift"
              value={shift}
              onChange={e => setShift(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Shift</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
              <option value="NOC">NOC</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Status</option>
              <option value="open">Open</option>
              <option value="filled">Filled</option>
            </select>
          </div>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        nowIndicator={true}
        events={events}
        eventContent={renderEventContent}
        eventClassNames={(arg) => {
        const status = arg.event.extendedProps.status;
        return status === 'open' ? 'bg-green-100 text-black' : 'bg-red-100 text-black';
  }}
  eventClick={(info) => {
    navigate(`/edit-shift/${info.event._def.publicId}`)
  }}
      />
    </div>
  );
};

export default BookingCalendar;

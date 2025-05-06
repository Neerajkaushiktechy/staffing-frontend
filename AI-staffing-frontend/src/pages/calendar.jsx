import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getShifts_url, getFacilities_url, getNurseTypes_url } from '../urls/adminUrls';
import { get } from '../services/apiServices';
import { toast } from 'react-toastify';
const BookingCalendar = () => {
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
      <div className="filters">
      {nurseTypes.length > 0 && (
        <select value={nurseType} onChange={e => setNurseType(e.target.value)}>
        <option value="">All Nurse Types</option>
        {nurseTypes.map((type) => (
        <option key={type.id} value={type.nurse_type}>{type.nurse_type}</option>
    ))}
        </select>
    )}

    {facilities.length > 0 && (
    <select value={facility} onChange={e => setFacility(e.target.value)}>
        <option value="">All Facilities</option>
        {facilities.map((item) => (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
        ))}
    </select>
    )}

        <select value={shift} onChange={e => setShift(e.target.value)}>
          <option value="">Shift</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
          <option value="NOC">NOC</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="filled">Filled</option>
        </select>
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
      />
    </div>
  );
};

export default BookingCalendar;

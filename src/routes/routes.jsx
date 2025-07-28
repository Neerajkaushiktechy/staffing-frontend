import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';
import AddFacility from '../pages/addFacility';
import FacilitiesList from '../pages/facilities';
import Nurses from '../pages/nurses';
import AddNurse from '../pages/addNurse';
import ManageNurses from '../pages/manageNurseTypes';
import EditFacility from '../pages/editFacility';
import EditNurse from '../pages/editNurse';
import SettingsMain from '../pages/settingsMain';
import BookingCalendar from '../pages/calendar';
import Shifts from '../pages/shifts';
import AddShift from '../pages/addShift';
import EditShift from '../pages/editShift';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/add-facility"
        element={
            <AddFacility />
        }
      />
      <Route
        path="/facilities"
        element={
            <FacilitiesList />
        }
      />
      <Route
        path="/nurses"
        element={
            <Nurses />
        }
      />
      <Route
        path="/add-nurse"
        element={
            <AddNurse />
        }
      />
      <Route
        path="/manage-nurse-types"
        element={
            <ManageNurses />
        }
      />
      <Route
        path="/edit-facility/:id"
        element={
            <EditFacility />
        }
      />
      <Route
        path="/edit-nurse/:id"
        element={
            <EditNurse />
        }
      />
      <Route
        path="/settings"
        element={
            <SettingsMain />
        }
      />
      <Route
        path="/bookingscalendar"
        element={
            <BookingCalendar />
        }
      />
      <Route
        path="/shifts"
        element={
            <Shifts />
        }
      />
      <Route
        path="/add-shifts"
        element={
            <AddShift />
        }
      />
      <Route
        path="/edit-shift/:id"
        element={
          <EditShift />
        }
        />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

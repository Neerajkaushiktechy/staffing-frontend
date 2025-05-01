import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/NotFound';
import AddFacility from '../pages/addFacility';
import PrivateRoute from './privateRoute';
import FacilitiesList from '../pages/facilities';
import Nurses from '../pages/nurses';
import AddNurse from '../pages/addNurse';
import Settings from '../pages/settings';
import EditFacility from '../pages/editFacility';
import EditNurse from '../pages/editNurse';
const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/add-facility"
          element={
            <PrivateRoute>
              <AddFacility/>
            </PrivateRoute>
          }
        />
        <Route
          path="/facilities"
          element={
            <PrivateRoute>
              <FacilitiesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/nurses"
          element={
            <PrivateRoute>
              <Nurses/>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-nurse"
          element={
            <PrivateRoute>
              <AddNurse/>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings/>
            </PrivateRoute>
          }
        />
        <Route path="/edit-facility/:id" 
        element={
        <PrivateRoute>
          <EditFacility />
        </PrivateRoute>
        } />
        <Route path="/edit-nurse/:id" 
        element={
        <PrivateRoute>
          <EditNurse/>
        </PrivateRoute>
        } />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
  );
};

export default AppRoutes;

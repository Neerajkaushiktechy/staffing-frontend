import React from 'react'
import facilities_logo from '../assets/facilities.png'
import calendar_logo from '../assets/calendar_logo.png'
import nurses_logo from '../assets/nurses_logo.png'
import settings_logo from '../assets/settings_logo.png'
import shifts_logo from '../assets/hospital-building_logo.png'
import { Link } from 'react-router-dom'
export const Sidebar = () => {
  return (
<aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
      <li>
         <Link to="/bookingscalendar" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src={calendar_logo} alt="Facilities Logo" className="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"/>
            <span className="ms-3">Calendar</span>
         </Link>

         </li>
         <li>
         <Link to="/facilities" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src={facilities_logo} alt="Facilities Logo" className="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"/>
            <span className="ms-3">Facilities</span>
         </Link>

         </li>
         <li>
            <Link to="/nurses" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" src={nurses_logo} alt='nurses logo'>
               </img>
               <span className="flex-1 ms-3 whitespace-nowrap">Nurses</span>
            </Link>
         </li>
         <li>
         <Link to="/shifts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" src={shifts_logo} alt='nurses logo'>
               </img>
               <span className="flex-1 ms-3 whitespace-nowrap">Shifts</span>
            </Link>
         </li>
      </ul>
      <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
         <li>
            <Link to="/settings" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               <img className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" src={settings_logo} alt='settings logo'>
               </img>
               <span className="ms-3">Settings</span>
            </Link>
         </li>
      </ul>
   </div>
</aside>
  )
}

export default Sidebar
import React, { useEffect } from 'react'
import logo from "../assets/ai_staffing_logo.png"
import { post } from '../services/apiServices'
import { logout_url } from '../urls/adminUrls'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import user_logo from "../assets/user_logo.png"
import { useAuth } from '../middleware/AuthContext'
import { initFlowbite } from 'flowbite'

export const Navbar = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()

    useEffect(() => {
        initFlowbite();
    }, []);

    const handleSignOut = async()=>{
        try {
            const res = await post(logout_url,{},true)
            if(res.data.status==200){
                setIsAuthenticated(false)
                navigate('/')
                toast.success("Logged out successfully")
            }
        } catch (error) {
            toast.error("An error has occured")
            console.error(error)
        }
    }

    return (
        <nav className="fixed top-0 right-0 left-64 z-40 bg-white border-gray-200 dark:bg-gray-900">
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AI staffing</span>
                </a>

                {/* User Section (Right aligned) */}
                <div className="flex items-center">
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <img className="w-8 h-8 rounded-full" src={user_logo} alt="user photo" />
                    </button>
                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
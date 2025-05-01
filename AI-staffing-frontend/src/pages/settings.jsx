import React, { useState } from 'react'
import { post } from '../services/apiServices'
import { addNurseType_url } from '../urls/adminUrls'
import { toast } from 'react-toastify'

const Settings = () => {
    const [nurseType, setNurseType] = useState("")
    const handleAddNurseType = async()=>{
        const data = {nurse_type:nurseType}
        const res = await post(addNurseType_url,data,true)
        if(res.data.status == 200){
            toast.success("Position added sucessfully")
            setNurseType("")
        }
        else{
            toast.error("An error has occured")
        }
    }
  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center">Add nurse type</h1>
        <div className="w-full max-w-4xl">
          <input 
            type="text" 
            placeholder="Nurse type" 
            value={nurseType} 
            onChange={e => setNurseType(e.target.value)}
            className="w-full p-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-1/4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleAddNurseType}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
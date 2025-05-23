import { BackpackIcon } from "lucide-react"

const BACKEND_URL = import.meta.env.VITE_API_URL
const login_url = `${BACKEND_URL}login`
const addFacility_url = `${BACKEND_URL}add-facility`
const editFacility_url = (id) => `${BACKEND_URL}edit-facility/${id}`
const editNurse_url = (id) => `${BACKEND_URL}edit-nurse/${id}`
const logout_url = `${BACKEND_URL}logout`
const getFacilities_url = `${BACKEND_URL}get-facility`
const getNurses_url = `${BACKEND_URL}get-nurses`
const addNurse_url = `${BACKEND_URL}add-nurse`
const addNurseType_url = `${BACKEND_URL}add-nurse-type`
const getNurseType_url = `${BACKEND_URL}get-nurse-type`
const getFacilityById_url = (id) => `${BACKEND_URL}get-facility-by-id/${id}`
const getNurseById_url = (id) => `${BACKEND_URL}get-nurse-by-id/${id}`
const deleteFacility_url = (id) => `${BACKEND_URL}delete-facility/${id}`
const deleteNurse_url = (id) => `${BACKEND_URL}delete-nurse/${id}`
const deleteService_url = (id,role) => `${BACKEND_URL}delete-service/${id}/${role}`
const getNurseTypes_url = `${BACKEND_URL}get-nurse-types`
const deleteNurseType_url = (id) => `${BACKEND_URL}delete-nurse-type/${id}`
const updateNurseType_url = (id) => `${BACKEND_URL}edit-nurse-type/${id}`
const getShifts_url = (params) => `${BACKEND_URL}get-shifts?${params.toString()}`
const deleteCoordinator_url = (id) => `${BACKEND_URL}delete-coordinator/${id}`
const getAllShifts_url = `${BACKEND_URL}get-all-shifts`
const deleteShift_url = (id) => `${BACKEND_URL}delete-shift/${id}`
const getCoordinatorsByFacility_url = (id)=> `${BACKEND_URL}get-coordinators-by-facility/${id}`
const getCoordinatorById_url = (id) => `${BACKEND_URL}get-coordinator-by-id/${id}`
const getAvailableNurses_url = `${BACKEND_URL}get-available-nurses`
const addShift_url = `${BACKEND_URL}add-shift`
const getShiftDetailsById_url = (id) => `${BACKEND_URL}get-shift-by-id/${id}`
const editShift_url = (id) => `${BACKEND_URL}edit-shift/${id}`
export{
    login_url,
    addFacility_url,
    editFacility_url,
    logout_url,
    getFacilities_url,
    getNurses_url,
    addNurse_url,
    addNurseType_url,
    getNurseType_url,
    getFacilityById_url,
    getNurseById_url,
    editNurse_url,
    deleteFacility_url,
    deleteNurse_url,
    deleteService_url,
    getNurseTypes_url,
    deleteNurseType_url,
    updateNurseType_url,
    getShifts_url,
    deleteCoordinator_url,
    getAllShifts_url,
    deleteShift_url,
    getCoordinatorsByFacility_url,
    getCoordinatorById_url,
    getAvailableNurses_url,
    addShift_url,
    getShiftDetailsById_url,
    editShift_url
}
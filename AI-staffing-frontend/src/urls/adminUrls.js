
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
    getShifts_url
}
import axios from 'axios'
const post = async(url,data, credentials)=>{
    try {
        const response = await axios.post(url,data,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
        console.log("POST RESPONSE", response)
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        return response
    } catch (error) {
        console.error("ERROR", error)
    }
}

const get = async(url,credentials)=>{
    try {
        const response = await axios.get(url,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
        console.log("GET RESPONSE", response)
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        return response
    } catch (error) {
        console.error("ERROR", error)
    }
}

const put = async (url, data, credentials) => {
    try {
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: credentials
        });
        console.log("PUT RESPONSE", response);
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        return response;
    } catch (error) {
        console.error("PUT ERROR", error);
    }
};

const del = async (url, credentials) => {
    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: credentials
        });
        console.log("DELETE RESPONSE", response);
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        return response;
    } catch (error) {
        console.error("DELETE ERROR", error);
    }
};
export{
    post,
    get,
    put,
    del
}
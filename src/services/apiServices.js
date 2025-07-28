import axios from 'axios'
const post = async(url,data, credentials)=>{
    try {
        const response = await axios.post(url,data,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        console.log("post Response",response)
        return response
    } catch (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
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
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        console.log("get Response",response)
        return response
    } catch (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
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
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        console.log("put Response", response)
        return response;
    } catch (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
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
        if (response.data.status == 401 || response.data.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        console.log("delete Response", response)
        return response;
    } catch (error) {
        if (error.response.status == 401 || error.response.status == 403) {
            localStorage.removeItem("user")
            localStorage.removeItem("auth_token")
            window.location.href = "/"
            return null
        }
        console.error("DELETE ERROR", error);
    }
};
export{
    post,
    get,
    put,
    del
}
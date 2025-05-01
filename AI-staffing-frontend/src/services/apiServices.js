import axios from 'axios'

const post = async(url,data, credentials)=>{
    try {
        const response = await axios.post(url,data,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
        console.log("POST response from Backend", response.data)
        return response
    } catch (error) {
        console.error("ERROR", error)
    }
}

const get = async(url,credentials)=>{
    console.log("GET URL", url)
    try {
        const response = await axios.get(url,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
        console.log("GET response from Backend", response.data)
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
        console.log("PUT response from Backend", response.data);
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
        console.log("DELETE response from Backend", response.data);
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
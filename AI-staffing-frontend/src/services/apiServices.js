import axios from 'axios'

const post = async(url,data, credentials)=>{
    try {
        const response = await axios.post(url,data,{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:credentials
        })
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
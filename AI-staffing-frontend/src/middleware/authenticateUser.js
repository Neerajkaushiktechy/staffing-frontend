import { get } from "../services/apiServices"
import { token_verify } from "../urls/adminUrls"

const authenticateUser = async () => {
    try {
        console.log("Verifying token...");
        const res = await get(token_verify, true);
        if (res?.data?.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error)
        return false;
    }
};

export default authenticateUser;

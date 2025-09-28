import axios from "axios"
import { DEV_URI } from "@/constants/uri";
import { generateUUID, grabFaceMap } from "@/util/utilities";

export const initLobby = async () : Promise<void> => {
    try {
        await axios.post(DEV_URI+"/api/game/start", null);
        console.log("Sent lobby initialization signal")
    }
    catch(error) {
        console.log("Failed to send lobby initialization signal")
    }
}

// Returns true if server accepts data
// Returns false if server rejects data
// Throws error if error encountered (i.e. server not running)
export const sendUserData = async () : Promise<boolean> => {

    const userDataPayload = {
        uuid: generateUUID(),
        faceMap: grabFaceMap()
    }

    try {
        await axios.post<string>(DEV_URI + "/api/player/user", userDataPayload);
        console.log("Sent user data successfully.");
        return true;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 406) {
                console.log("Server not ready. Rejected with 406.");
                return false; // The request was rejected as expected
            }
        }
        
        console.log("An unexpected error occurred:", error);
        return false;
    }
}
import axios from "axios"
import { DEV_URI } from "@/constants/uri";
import { generateUUID, grabFaceMap } from "@/util/utilities";

export const initLobby = async () : Promise<void> => {
    try {
        await axios.post(DEV_URI, null);
        console.log("Sent lobby initialization signal")
    }
    catch(error) {
        console.log("Failed to send lobby initialization signal")
    }
}

export const sendUserData = async() : Promise<void> => {

    const userDataPayload = {
        uuid: generateUUID(),
        faceMap: grabFaceMap()
    }

    try {
        await axios.post(DEV_URI, userDataPayload);
        console.log("Sent user data")
    }
    catch(error) {
        console.log("Failed to send user data")
    }
}
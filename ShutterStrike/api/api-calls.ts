import axios from 'axios'
import { DEV_URI } from "@/constants/uri";

export const initLobby = async () : Promise<void> => {
    try {
        await axios.post(DEV_URI, null);
        console.log("Sent lobby initialization signal")
    }
    catch(error) {
        console.log("Failed to send lobby initialization signal")
    }
}
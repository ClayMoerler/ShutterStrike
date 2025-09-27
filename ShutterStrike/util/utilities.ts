import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () : String => {
    return uuidv4();
}

export const grabFaceMap = () : String => {
    return ":D"
}
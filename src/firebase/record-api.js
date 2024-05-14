import { get, dbRef, set, ref, db } from './firebase';
import { child } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const RecordAPI = {
    getRecords: async(uid) => {
        const result = await get(child(dbRef, uid))

        try {
            return result.val();
        } catch(err) {
            throw err;
        }
    },
    postRecord: async(uid, date, input, type, convention, results) => {
        const inputData = {
            date: date,
            input: input,
            type: type,
            convention: convention,
            results: results,
        }

        const result = await set(ref(db, uid + `/${uuid()}`), inputData);

        return result;
    }
}

export default RecordAPI;
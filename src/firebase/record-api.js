import { get, dbRef, set, ref, db } from './firebase';
import { child } from 'firebase/database';
import { v4 as uuid } from 'uuid';

/*
  results: [] //결과 3개 저장용
  date: //날짜
  input: //입력한 메시지
  type: //타입
  convention: //표기법
*/

const RecordAPI = {
    getRecords: async(uid) => {
        const result = await get(child(dbRef, "/" + uid))

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
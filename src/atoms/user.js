import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: { 
    uid: "", 
    isAuthenticated: false, 
    name: null
  },
  effects_UNSTABLE: [persistAtom],
});
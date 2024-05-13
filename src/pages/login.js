import '../App.css';
import { auth, signInWithEmailAndPassword } from '../firebase/firebase';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/user';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

const getErrorMessage = (error) => {
    switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password" || "auth/invalid-credential":
            return "이메일 혹은 비밀번호가 일치하지 않습니다.";
        case "auth/weak-password":
            return "비밀번호는 6글자 이상이어야 합니다.";
        case "auth/network-request-failed":
            return "네트워크 연결에 실패 하였습니다.";
        case "auth/invalid-email":
            return "잘못된 이메일 형식입니다.";
        case "auth/internal-error":
            return "잘못된 요청입니다.";
        default:
            console.log(error);
            return "로그인에 실패하였습니다.";
      }
}


const Login = () => {
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);
    const [user, setUserState] = useRecoilState(userState);

    const handleLogin = async () => {
        if (email.current.value == null || password.current.value == null || email.current.value === "" || password.current.value === "") {
            toast.error("아이디와 비밀번호를 입력해 주세요!");
            return;
        }

        toast.promise(
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userData) => {
                    setUserState({ uid: userData.user.uid, isAuthenticated: true, name: userData.user.displayName });
                    navigate('/');
                }),
            {
                loading: '로그인 중...',
                success: '로그인에 성공하였습니다!',
                error: (err) => getErrorMessage(err),
            }
        );
    }

    const handleEnterKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="background">
           <div className="rect w-[469px] h-[523px]">
                <label className="mt-[40px] font-pre_var font-light text-[38px] tracking-[3%]">
                    환영합니다.
                </label>
                <div className="ml-[60px] mr-auto mb-[28px]">
                    <label className="label">
                        이메일
                    </label>
                    <input className="user_input" type="email" ref={email} onKeyDown={handleEnterKeyDown}></input>
                    <label className="label">비밀번호</label>
                    <input className="user_input" type="password" ref={password} onKeyDown={handleEnterKeyDown}></input>
                </div>
                <div className="mr-auto ml-[60px] flex items-start">
                    <button className="text-[#818181] font-pre_reg font-normal text-[15px] underline" onClick={() => navigate('/signup')}>
                        계정이 없으신가요?
                    </button>
                </div>
                <button className="button mt-[28px] text-shadow shadow-white"
                        onClick={handleLogin}
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
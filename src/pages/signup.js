import { useRef } from 'react';
import toast from 'react-hot-toast';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const password_check = useRef(null);

    const getErrorMessage = (error) => {
        switch (error.code) {
            case "auth/email-already-in-use":
                return '이미 존재하는 계정의 이메일입니다.';
            case "auth/internal-error":
                return 'Firebase 인증서버가 응답하지 않습니다.';
            case "auth/invalid-email":
                return '잘못된 이메일 형식입니다.';
            case "auth/invalid-password":
                return '비밀번호는 6글자 이상 입력해야 합니다.';
            case "auth/network-request-failed":
                return '네트워크 연결에 실패했습니다.';
            default:
                console.log(error.code);
                return '알 수 없는 오류가 발생했습니다.';
        }
    }

    const handleSignup = async() => {
        if (name.current.value == null || name.current.value === "") {
            toast.error("이름을 입력해 주세요.");
            return;
        }
    
        if (email.current.value == null || email.current.value === "") {
            toast.error("이메일을 입력해 주세요.");
            return;
        }
    
        if (password.current.value == null || password.current.value === "") {
            toast.error("비밀번호를 입력해 주세요.");
            return;
        }
    
        if (password_check.current.value == null || password_check.current.value === "") {
            toast.error("비밀번호 확인을 입력해 주세요.");
            return;
        }

        if (password.current.value !== password_check.current.value) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }

        toast.promise(
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(async (credential) => {
                    await updateProfile(credential.user, { displayName: name.current.value });
                    navigate('/login');
                }),
            {
                loading: '회원가입 진행 중입니다...',
                success: '회원가입이 완료되었습니다!',
                error: (err) => getErrorMessage(err),
            }
        );
    };

    return (
        <div className="background">
            <div className="rect w-[999px] h-[778px]">
                <div className="m-auto flex flex-row justify-start items-center">
                    <div className="w-[540px] h-[740px]">
                    </div>
                    <div className="mr-auto flex flex-col justify-center items-center">
                        <label className="mr-auto mb-[-5px] mt-[20px] text-left font-pre_var font-bold text-[38px]">
                            회원가입
                        </label>
                        <label className="label">이름</label>
                        <input className="user_input" type="text" ref={name}></input>
                        <label className="label">이메일</label>
                        <input className="user_input" type="email" ref={email}></input>
                        <label className="label">비밀번호</label>
                        <input className="user_input" type="password" ref={password}></input>
                        <label className="label">비밀번호 확인</label>
                        <input className="user_input" type="password" ref={password_check}></input>
                        <button className="button mt-[72px] text-shadow shadow-white" 
                                onClick={handleSignup}
                        >
                            가입하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
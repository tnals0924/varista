import { userState } from "../atoms/user";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { auth, signOut } from '../firebase/firebase';
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Navigation = () => {
    const [user, setUserState] = useRecoilState(userState);
    const [isSignOutHovered, setSignOutHover] = useState(false);
    const [isMyPageHovered, setMyPageHover] = useState(false);
    const [isHomeHovered, setHomeHover] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async() => {
        toast.promise(
            signOut(auth)
                .then(() => {
                    setUserState({ uid: "", isAuthenticated: false, name: null });
                    navigate('/login');
                }),
            {
                loading: '로그아웃 중...',
                success: '로그아웃에 성공하였습니다!',
                error: (err) => `${err.code}`,
            }
        )
    }

    return (
        <div className="w-screen h-[120px] flex flex-row justify-end items-start">
            <button className="w-[24px] h-[24px] mt-[44.5px] mb-[40px] mr-[30px] border-none"
                    onClick={handleSignOut} 
                    onMouseOver={() => setSignOutHover(true)} 
                    onMouseOut={() => setSignOutHover(false)}
                    data-tooltip-id="signout"
            >
                <img src={(isSignOutHovered) ? "assets/signout_hover.png" : "assets/signout.png"} alt=""/>
            </button>
            <Tooltip id='signout'
                     backgroundColor='gray'
                     place='bottom'
                     content="로그아웃"
            />
            <button className="w-[24px] h-[24px] mt-[44.5px] mb-[40px] mr-[30px] border-none"
                    onClick={() => navigate('/')} 
                    onMouseOver={() => setHomeHover(true)} 
                    onMouseOut={() => setHomeHover(false)}
                    data-tooltip-id="home"
            >
                <img src={(isHomeHovered) ? "assets/home_hover.png" : "assets/home.png"} alt=""/>
            </button>
            <Tooltip id='home'
                     backgroundColor='gray'
                     place='bottom'
                     content="메인으로"
            />
            <button className="w-[24px] h-[24px] mt-[44.5px] mb-[40px] mr-[30px] border-none"
                    onClick={() => navigate('/mypage')}
                    onMouseOver={() => setMyPageHover(true)}
                    onMouseOut={() => setMyPageHover(false)}
                    data-tooltip-id="mypage"
            >
                <img src={(isMyPageHovered) ? "assets/mypage_hover.png" : "assets/mypage.png"} alt=""/>                    
            </button>
            <Tooltip id='mypage'
                     backgroundColor='gray'
                     place='bottom'
                     content="마이페이지"
            />
            <label className="mr-[30px] mt-[40px] mb-[40px] text-center font-pre_var font-bold text-[22px]">
                {user.name} 님
            </label>
        </div>
    );
}

export default Navigation;
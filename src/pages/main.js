import { useNavigate } from 'react-router-dom';
import { userState } from '../atoms/user';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';
import { auth, signOut } from '../firebase/firebase';
import signOutLogo from '../assets/signout.png';
import signOutHoverLogo from '../assets/signout_hover.png';
import { useState, useRef } from 'react';
import  axios from 'axios';
import { NameType, NamingConvention } from '../constants/enums';

const Main = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [user, setUserState] = useRecoilState(userState);
    const [isHovered, setHover] = useState(false);
    const [nameType, setNameType] = useState(0);
    const [namingConvention, setNamingConvention] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const contents = useRef(null);

    const getDisplayResults = (data) => {
        return data.toString().split('\n');
    }

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

    const handleTypeChange = (event) => {
        setNameType(parseInt(event.target.value));
        console.log(`type changed: ${NameType[nameType]}`);
    }
    
    const handleConventionChange = (event) => {
        setNamingConvention(parseInt(event.target.value));
        console.log(`convention changed: ${NamingConvention[namingConvention]}`);
    }

    const onSubmit = async() => {
        if (isLoading) {
            toast.error("서버로부터 응답을 받는 중입니다!");
            return;
        }

        if (contents.current.value == null || contents.current.value === '') {
            toast.error("내용을 입력해 주세요!");
            return;
        }

        setLoading(true);

        const message = `'${contents.current.value}'라는 내용의 ${NameType[nameType].name} 이름을 ${NamingConvention[namingConvention].name}로 3개 추천해줘`

        toast.promise(
            axios.post(
                process.env.REACT_APP_SERVER_URL,
                { message }
            ).then((res) => {
                console.log(res);
                //const newResults = getResultsFromMessage(res);

                setResult(getDisplayResults(res.data.message));
                setLoading(false);
            }),
            {
                loading: "추천 결과를 받아오는 중...",
                success: "성공적으로 추천 결과를 받아왔습니다!",
                error: (err) => {
                    console.log(err);
                    setLoading(false);
                    return `추천 결과를 받아오지 못했습니다.`
                }
            }
        );
    }

    return (
        <div className="background flex-col justify-start">
            <div className="w-screen h-[120px] flex flex-row justify-end items-start">
                <button className="w-[24px] h-[24px] mt-[44.5px] mr-[30px] border-none"
                        onClick={handleSignOut} 
                        onMouseOver={() => setHover(true)} 
                        onMouseOut={() => setHover(false)}
                >
                    <img src={(isHovered) ? signOutHoverLogo : signOutLogo} alt=""/>
                </button>
                <label className="mr-[30px] mt-[40px] text-center font-pre_var font-bold text-[22px]">
                    {user.name} 님
                </label>
            </div>
            <div className="w-[1762px] h-[860px] flex flex-row justify-center items-center">
                <div className="rect w-[803px] h-[918px] shadow[0_15px_30px_-2px_rgba(0, 0, 0, 0.04)]">
                    <label>
                        메인 페이지입니다. {user.uid} {user.name}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="name_type"
                            value={0}
                            onChange={handleTypeChange}
                            checked={nameType === 0}
                        />함수
                     </label>
                    <label>
                        <input 
                            type="radio"
                            name="name_type"
                            value={1}
                            onChange={handleTypeChange}
                            checked={nameType === 1}
                        />변수
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="naming_convention"
                            value={0}
                            onChange={handleConventionChange}
                            checked={namingConvention === 0}
                        />
                        snake_case
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="naming_convention"
                            value={1}
                            onChange={handleConventionChange}
                            checked={namingConvention === 1}
                        />
                        camelCase
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="naming_convention"
                            value={2}
                            onChange={handleConventionChange}
                            checked={namingConvention === 2}
                        />
                        PascalCase
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="naming_convention"
                            value={3}
                            onChange={handleConventionChange}
                            checked={namingConvention === 3}
                        />
                        strHungarian
                    </label>
                    <textarea 
                        className="resize-none w-full h-1/3"
                        placeholder="내용을 입력해 주세요." 
                        ref={contents}>
                    </textarea>
                    <button
                        className="button"
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        추천받기
                    </button>
                </div>
                <div className="rect w-[803px] h-[918px] shadow[0_15px_30px_-2px_rgba(0, 0, 0, 0.04)]">
                    {result
                        .filter((value, index) => (index >= 2))
                        .map((value, index) => (
                            <span key={index}>
                                {value}
                            </span>)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Main;
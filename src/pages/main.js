import { licenseState, userState } from '../atoms/user';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';
import { useState, useRef, useEffect } from 'react';
import  axios from 'axios';
import { NameType, NamingConvention } from '../constants/enums';
import CustomRadio from '../components/custom-radio';
import Navigation from '../components/navigation';
import RecordAPI from '../firebase/record-api';
import Result from '../components/result';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Main = () => {
    const [result, setResult] = useState([]);
    const [user, setUserState] = useRecoilState(userState);
    const [license, setLicense] = useRecoilState(licenseState);
    const [nameType, setNameType] = useState(0);
    const [namingConvention, setNamingConvention] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const contents = useRef(null);
    const isResultMounted = useRef(false);

    useEffect(() => {
        if (!isResultMounted.current) {
            isResultMounted.current = true
        } else {
            const input = contents.current.value;
            if (input !== "") {
                const date = new Date().toISOString();
                RecordAPI.postRecord(user.uid, date, input, nameType, namingConvention, result);
            }
        }
    }, [result]);

    const getDisplayResults = (data) => {
        return data.toString().split('\n').map((value, index) => (
            value + ((nameType === 1) ? "()" : "")
        ));
    }

    const handleTypeChange = (index) => {
        setNameType(index);
    }
    
    const handleConventionChange = (index) => {
        setNamingConvention(index);
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

        const count = (license.isPro) ? 5 : 3;
        const message = `'${contents.current.value}'라는 내용의 ${NameType[nameType].name} 이름을 ${NamingConvention[namingConvention].name}로 ${count}개 추천해줘.`

        toast.promise(
            axios.post(
                process.env.REACT_APP_SERVER_URL,
                { message }
            ).then((res) => {
                console.log(res);
                const newResults = getDisplayResults(res.data.message);

                setResult(newResults.filter((value, index) => (index >= 2)));
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
        <div className="background max-fhd:h-[fit-content] fhd:h-screen flex-col justify-start">
            <Navigation />
            <div className="flex dr:flex-row max-dr:flex-col justify-center items-center mb-[120px]">
                <div className="rect w-[803px] h-[918px] dr:mr-[20px] max-dr:mb-[20px] shadow-[0_15px_30px_-2px_rgba(0, 0, 0, 0.04)]">
                    <div className="flex justify-center items-center mr-auto ml-[39px] mb-[9px]">
                        <label className="main_label mt-[30px]">
                            타입
                        </label>
                    </div>
                    <div className="pl-[35px] mr-auto flex flex-col items-start justify-start">
                        <div className="mb-[19px] pr-[16px] flex flex-row justify-center">
                            {
                                NameType.map((value, index) => (
                                    <CustomRadio key={index} 
                                                 icon={value.icon}
                                                 isSelected={nameType === index}
                                                 onClick={() => {handleTypeChange(index)}}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-center items-center mr-auto ml-[39px] mb-[9px]">
                        <label className="main_label">
                            표기법
                        </label>
                    </div>
                    <div className="pl-[35px] mr-auto flex flex-col items-start justify-start">
                        <div className="mb-[19px] pr-[16px] flex flex-row justify-center">
                            {
                                NamingConvention.map((value, index) => (
                                    <CustomRadio key={index}
                                                 icon={value.icon}
                                                 isSelected={namingConvention === index}
                                                 onClick={() => {handleConventionChange(index)}}
                                    />
                                ))
                            }
                    </div>
                    </div>
                    <textarea 
                        className="resize-none w-[735px] h-[530px] pl-[10px] pt-[10px] border-[0.5px] border-solid border-[#d2d2d2] focus:border-[#579aff] focus:border-[2px] rounded-[10px] font-pre_var"
                        placeholder="내용을 입력해 주세요."
                        ref={contents}>
                    </textarea>
                    <button
                        className="button mt-[30px]"
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        추천받기
                    </button>
                </div>
                <div className={(result.length > 0) ? ("w-[803px] h-[918px] dr:ml-[20px] max-dr:mt-[20px] flex justify-center items-center flex-col") : ("hidden")}>
                    <div className="flex flex-col justify-center items-center">
                        <label className="ml-[34px] mt-[37px] mb-[17px] font-pre_var font-semibold text-[30px]">
                            추천 결과를 확인해 보세요!
                        </label>
                        <img src='assets/result.svg' alt='' />
                    </div>
                    <div className="mt-[20px] flex flex-col justify-center items-center">
                        {
                            result.map((value, index) => (
                                <Result key={index}
                                        resultText={value} />
                            ))
                        }
                        <Tooltip id='result'
                                 backgroundColor='gray'
                                 place='right'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
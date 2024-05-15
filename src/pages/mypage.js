import { useRecoilState } from 'recoil';
import Navigation from '../components/navigation';
import { licenseState, userState } from '../atoms/user';
import RecordAPI from '../firebase/record-api';
import { useEffect, useState } from 'react';
import Record from '../components/record';

function MyPage() {
    const [records, setRecords] = useState(null);
    const [user, setUserState] = useRecoilState(userState);
    const [license, setLicense] = useRecoilState(licenseState);

    const togglePro = (event) => {
        const checked = event.target.checked
        
        setLicense({ isPro: checked });
    }

    const loadRecords = async () => {
        const response = await RecordAPI.getRecords(user.uid);

        if (response != null) {
            setRecords(response);
        }
    }

    useEffect(() => {
        console.log(records);
    }, [records]);

    useEffect(() => {
        loadRecords();
    }, [])

    return (
        <div className="background max-fhd:h-[fit-content] fhd:h-screen flex-col justify-start items-center">
            <Navigation />
            <div className="rect w-[803px] h-[850px] mb-[120px] flex justify-start items-center">
                <div className="mt-[20px]">
                    <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" checked={license.isPro} onChange={togglePro}></input>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0066ff]"></div>
                    <span className="ms-3 text-md font-pre_reg font-medium text-gray-500">Pro 라이센스 체험하기</span>
                </label>
                </div>
                <img className="mt-[80px] mb-[26px]" src='assets/user.svg' alt='' />
                <div className="flex flex-row justify-center items-center">
                    {
                        (license.isPro) ?
                        <img className="mr-[10px]" src='assets/pro.svg' alt='' /> : <span></span>
                    }
                    <span className="font-pre_reg font-bold text-[35px]">
                        {user.name}
                    </span>
                </div>
                {
                    (license.isPro) ? 
                    <span className="font-pre_var font-normal text-[20px] text-[#ffb743]">PRO</span> : <span className="font-pre_var font-normal text-[20px] text-[#c1c1c1]">BASIC</span>
                }
                <div className="mt-[50px] w-[740px] h-[360px] overflow-auto flex flex-col justify-start items-center">
                    {
                        (records != null) ? 
                        Object.keys(records)
                        .sort((a, b) => new Date(records[a].date) - new Date(records[b].date))
                        .reverse()
                        .map((key, index) => {
                            const record = records[key]

                            return (<Record key={index}
                                            date={record.date}
                                            input={record.input}
                                            type={record.type}
                                            convention={record.convention}
                                            results = {record.results}
                            />)
                        }) :
                        <span className="text-gray font-pre_reg font-medium text-[20px]">
                            사용 기록이 없습니다.
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyPage;
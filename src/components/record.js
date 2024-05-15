import { NameType, NamingConvention } from '../constants/enums'
import { useState } from 'react';
import formatDate from '../utils/date-format';

function Record(props) {
    const { date, input, type, conventions, results, onClick } = props;
    const [showDetails, setShowDetails] = useState(false);

    return (
        <details className="flex justify-center items-center" onToggle={() => setShowDetails((current) => !current)}>
            <summary className="flex justify-center items-center">
                <div className="w-[700px] pb-[5px] mt-[24px] border-solid border-b-[1px] border-black relative flex justify-between items-center"
                    onClick={onClick}
                >
                    <div className="w-[450px]">
                        <p className="ml-[5px] truncate font-pre_reg font-light text-[18px] text-black">
                            {(showDetails) ? '▼' : '▶︎' } {input}
                        </p>
                    </div>

                    <span className="font-pre_reg font-light text-[18px] text-[#7d7d7d] mr-[5px]">
                        {formatDate(new Date(date))}
                    </span>
                </div>
            </summary>
            <div className="overflow-auto w-[716px] h-[250px] pl-[20px] flex flex-col items-start">
                <div className="mt-6 w-[90%] border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-pre_reg font-medium leading-6 text-gray-900">입력</dt>
                            <dd className="mt-1 text-sm font-pre_reg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{input}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-pre_reg font-medium leading-6 text-gray-900">타입</dt>
                            <dd className="mt-1 text-sm font-pre_reg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{NameType[Number((type !== undefined) ? type : 0)].name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-pre_reg font-medium leading-6 text-gray-900">표기법</dt>
                            <dd className="mt-1 text-sm font-pre_reg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{NamingConvention[Number((conventions !== undefined) ? conventions : 0)].name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-pre_reg font-medium leading-6 text-gray-900">추천 결과</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {
                                    results.map((value, index) => (
                                        <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div key={index} className="flex w-0 flex-1 items-center">
                                                <div key={index} className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span key={index} className="truncate font-d2 font-bold">{value}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </details>
    );
}

export default Record;
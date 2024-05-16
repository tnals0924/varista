import { toast } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

const Result = ({ resultText }) => {
    const [isHovered, setHover] = useState(false);

    return (
        <CopyToClipboard text={resultText}
                        onCopy={() => toast.success("추천 결과를 복사했습니다!")}
        >
            <button className="bg-white w-[461px] h-[50px] mb-[20px] rounded-[10px] drop-shadow-md font-d2 font-bold text-[22px] text-center text-[#0066ff] hover:bg-[#0066ff] hover:text-white"
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                    data-tooltip-id='result'
                    data-tooltip-content={'클릭하여 복사합니다.'}
            >
                <div className="flex flex-row justify-center items-center relative">
                    {resultText}
                    <div className="absolute right-[15px] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                        {(isHovered) ? <img src='assets/copy.svg' alt='' /> : <span></span>}
                    </div>
                </div>
            </button>
        </CopyToClipboard>
    );
}

export default Result;
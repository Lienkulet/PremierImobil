'use client';
import Image from "next/image";
import { useState } from "react";

const Question = ({ header, text }) => {
    const [expand, setExpand] = useState(false);

    const handleChange = () => {
        setExpand(!expand);
    }

    return (
        <div className="w-[400px]">
            <button 
                className="bg-matteBlack p-5 flex h-fit min-h-[90px] w-full flex-row items-start gap-2 rounded-xl" 
                onClick={handleChange}>
                <Image 
                    src={expand ? "/downarrow.svg" : "/uparrow.svg"} 
                    alt="arrow" 
                    width={28} 
                    height={28} 
                    className="transition-transform duration-300 ease-linear"
                    style={{ transform: expand ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
                <div className="flex flex-col">
                    <p className={`text-start font-medium text-mainOrange text-base`}>
                        {header}
                    </p>
                </div>
            </button>
            
            {/* Expanded Content */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expand ? "max-h-96 opacity-100 bg-matteBlack p-5 rounded-xl -mt-2" : "max-h-0 opacity-0 bg-matteBlack p-0"}`}>
                <p className="text-white text-sm">
                    {text}
                </p>
            </div>
        </div>
    );
}

export default Question;

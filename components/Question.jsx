'use client';
import Image from "next/image"
import { useState } from "react"

const Question = ({ header, text}) => {
    const [expand, setExpand] = useState(false);

    const handleChange = () => {
        setExpand(!expand);
    }

  return (
    <button className="bg-matteBlack p-5 flex h-fit min-h-[90px] w-[400px] flex-row items-start gap-2 rounded-xl" onClick={handleChange}>
        <Image src={expand? "/downarrow.svg" : "/uparrow.svg"} alt="arrow" width={28} height={28} className="duration-700 ease-linear"/>
        <div>
        <p className={`text-start font-medium ${expand? "text-white text-sm" : "text-mainOrange text-base"} `}>{expand? text : header }</p>
        </div>
    </button>
  )
}

export default Question
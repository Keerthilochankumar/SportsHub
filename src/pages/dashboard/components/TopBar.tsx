import React from 'react'
import { AiFillSetting } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
const TopBar = () => {
  return (
    <div className="w-full min-h-[40px] border-2 border-black">
        <div className="grid grid-cols-3 gap-4 m-2">
        <div className=" text-2xl font-bold mr-2">Sports Hub</div>
            <div className=""></div>
            <div className="flex flex-row justify-end mr-10">
                <div className="">
                <AiFillSetting size={30}/>
                </div>
                <div className="ml-10">
                <RxAvatar size={30}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopBar
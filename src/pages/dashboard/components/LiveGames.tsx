import React, { useEffect, useState } from 'react'
import Game from './Game';

type matches = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt:string;
    isRunning:boolean;
    teams: Array<Object>;

}
const LiveGames = () => {
    const [data , setData] = useState<matches[] | null>(null)
    const handleFetchData = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/matches`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              });
              const matchData = await response.json();
              console.log(matchData);
              setData(matchData.matches as unknown as matches[])
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        handleFetchData();
    },[])

  return (
    <div className="flex flex-col">
    <div className="mt-3">Live Games</div>
    <div className="w-full overflow-x-scroll max-h-[200px] mt-5 border-2 border-black flex">
      {data?.map((val, index) => (
        <div className="flex mr-5" key={index}>
          <Game data={val} />
        </div>
      ))}
    </div>
  </div>
)}

export default LiveGames
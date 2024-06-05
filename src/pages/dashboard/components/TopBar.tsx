import { Dialog } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import { BiLogOut } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../../../config/constants';

type Sport = {
  id: number;
  name: string;
};

const Preferences: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedSports, setSelectedSports] = useState<{ [key: number]: boolean }>({});
  const sports = [
    {
      "id": 1,
      "name": "Basketball"
    },
    {
      "id": 2,
      "name": "American Football"
    },
    {
      "id": 3,
      "name": "Rugby"
    },
    {
      "id": 4,
      "name": "Field Hockey"
    },
    {
      "id": 5,
      "name": "Table Tennis"
    },
    {
      "id": 6,
      "name": "Cricket"
    }
  ];

  const handleCheckboxChange = (id: number) => {
    setSelectedSports((prevSelectedSports) => ({
      ...prevSelectedSports,
      [id]: !prevSelectedSports[id]
    }));
  };

  useEffect(() => {
    console.log(selectedSports);
  }, [selectedSports]);

  const handleSumbit = async () => {
  const selectedIds = Object.keys(selectedSports).filter((key) => selectedSports[Number(key)]);
    const selectedNames = selectedIds.map((id) => {
      const sport = sports.find((s) => s.id === Number(id));
      return sport ? sport.name : null;
    }).filter((name) => name !== null);

    const temp = {
      preferences: selectedNames
    };
    console.log(temp);
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' , 'Authorization': `${localStorage.getItem('token')}`},
      body: JSON.stringify(temp)
    });
    console.log(response);
    if(response.ok){
      toast.success("Preferences updated successfully");
      onClose();
    }
  }
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white p-5 rounded shadow-lg w-3/4 max-w-xl overflow-auto max-h-full relative">
        <button className="absolute top-2 right-2" onClick={onClose}>Close</button>
        <h2 className="text-xl mb-2">Preferences</h2>
        <div className="flex flex-col">
          {sports.map((sport) => (
            <div key={sport.id} className="flex justify-between items-center p-2 border-b-2 border-black">
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedSports[sport.id] || false}
                  onChange={() => handleCheckboxChange(sport.id)} 
                />
                {sport.name}
              </label>
            </div>
          ))}
        </div>
        <div className="my-4 flex mx-auto justify-center border-2 border-black rounded-lg">
        <button onClick={handleSumbit}>Submit</button>
        </div>
      </div>
    </Dialog>
  );
};
const TopBar = () => {
  const [user, setUser] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    setUser(token ? true : false);
  },[])

  const handleRedirect = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  }
  return (
    <div className="w-full min-h-[40px] border-2 border-black">
      <div className="grid grid-cols-3 gap-4 m-2">
      <div className=" text-2xl font-bold mr-2">Sports Hub</div>
        <div className=""></div>
        <div className="flex flex-row justify-end mr-10">
          <div className="">
          {user ? <button onClick={handleRedirect}><BiLogOut size={30}/></button> : <button onClick={handleRedirect}>Log In</button>}
          </div>
          <div className="ml-10">
          {user && <button onClick={() => setOpen(!open)}><RxAvatar size={30}/></button>}
          </div>
        </div>
        {open && <Preferences onClose={() => setOpen(false)} />}
      </div>
    </div>
  )
}


export default TopBar
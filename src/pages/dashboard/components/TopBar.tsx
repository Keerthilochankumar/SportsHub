import { Dialog } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import { BiLogOut } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

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

  const teams = [
    {
      "id": 7,
      "name": "Thunderbolts",
      "plays": "Basketball"
    },
    {
      "id": 8,
      "name": "Dragonslayers",
      "plays": "Basketball"
    },
    {
      "id": 9,
      "name": "Phoenix Rising",
      "plays": "Basketball"
    },
    {
      "id": 10,
      "name": "Avalanche",
      "plays": "Basketball"
    },
    {
      "id": 11,
      "name": "Titans",
      "plays": "American Football"
    },
    {
      "id": 12,
      "name": "Vortex Vipers",
      "plays": "American Football"
    },
    {
      "id": 13,
      "name": "Spectral Shadows",
      "plays": "American Football"
    },
    {
      "id": 14,
      "name": "Blitzkrieg",
      "plays": "American Football"
    },
    {
      "id": 15,
      "name": "Fury United",
      "plays": "Rugby"
    },
    {
      "id": 16,
      "name": "Lightning Strikes",
      "plays": "Rugby"
    },
    {
      "id": 17,
      "name": "Serpents of Fire",
      "plays": "Rugby"
    },
    {
      "id": 19,
      "name": "Galaxy Warriors",
      "plays": "Rugby"
    },
    {
      "id": 20,
      "name": "Stormbreakers",
      "plays": "Field Hockey"
    },
    {
      "id": 21,
      "name": "Enigma Enforcers",
      "plays": "Field Hockey"
    },
    {
      "id": 22,
      "name": "Blaze Squadron",
      "plays": "Field Hockey"
    },
    {
      "id": 23,
      "name": "Phantom Phantoms",
      "plays": "Field Hockey"
    },
    {
      "id": 24,
      "name": "Celestial Chargers",
      "plays": "Table Tennis"
    },
    {
      "id": 25,
      "name": "Rebel Renegades",
      "plays": "Table Tennis"
    },
    {
      "id": 26,
      "name": "Inferno Ignitors",
      "plays": "Table Tennis"
    },
    {
      "id": 27,
      "name": "Stealth Strikers",
      "plays": "Table Tennis"
    },
    {
      "id": 28,
      "name": "Nova Knights",
      "plays": "Cricket"
    },
    {
      "id": 29,
      "name": "Crimson Crushers",
      "plays": "Cricket"
    },
    {
      "id": 30,
      "name": "Rapid Raptors",
      "plays": "Cricket"
    },
    {
      "id": 31,
      "name": "Shadow Assassins",
      "plays": "Cricket"
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
          {teams.map((sport) => (
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
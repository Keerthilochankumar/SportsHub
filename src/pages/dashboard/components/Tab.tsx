import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Articles from './Article';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../../config/constants';

export default function Example() {
    const [selectedTab, setSelectedTab] = useState<string>('All News');
    const [sportsData, setSportsData] = useState<any[]>([]);
    const handleSportsFetch = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/sports`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const sportsData = await response.json();
          setSportsData([{id:7,name: 'All News'} , ...sportsData.sports ]);
        } catch (error) {
          console.error("Error occurred when fetching sports:", error);
        }
      }
    useEffect(()=>{
        handleSportsFetch();
        console.log(sportsData ,"sports data") 
    },[])
  return (
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-4 mx-auto justify-center mt-5">
            {sportsData!.map((sport, index) => (
              <Tab
                key={index}
                className="px-4 py-2 rounded-lg text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-gray-200 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={() => setSelectedTab(sport.name)}
              >
                {sport.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="">
            {sportsData!.map((index) => (
              <TabPanel key={index} className="rounded-xl bg-white/5 p-3">
                <Articles sport={selectedTab} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
  );
}


import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Articles from './Article';
import { useState } from 'react';

const sports = [
  'All News',
  'Basketball',
  'American Football',
  'Rugby',
  'Field Hockey',
  'Table Tennis',
  'Cricket'
];

export default function Example() {
    const [selectedTab, setSelectedTab] = useState<string>('All News');
  return (
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-4 mx-auto justify-center mt-5">
            {sports.map((sport, index) => (
              <Tab
                key={index}
                className="px-4 py-2 rounded-lg text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-gray-200 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={() => setSelectedTab(sport)}
              >
                {sport}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="">
            {sports.map((sport, index) => (
              <TabPanel key={index} className="rounded-xl bg-white/5 p-3">
                <Articles sport={selectedTab} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
  );
}


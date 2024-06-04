import React from 'react'
import TopBar from './components/TopBar'
import LiveGames from './components/LiveGames'

const DashBoard: React.FC = () => {
  return (
    <div className="w-full h-screen">
        <div className="flex flex-col">
        <TopBar/>
        <LiveGames/>
        </div>
    </div>
  )
}

export default DashBoard
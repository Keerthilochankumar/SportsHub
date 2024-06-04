import React from 'react'
import TopBar from './components/TopBar'
import LiveGames from './components/LiveGames'
import Articles from './components/Article'
import Example from './components/Tab'

const DashBoard: React.FC = () => {
  return (
    <div className="w-full h-screen">
        <div className="flex flex-col">
        <TopBar/>
        <LiveGames/>
        <Example/>
        </div>
    </div>
  )
}

export default DashBoard
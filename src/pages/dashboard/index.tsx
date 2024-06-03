import React from 'react'
import TopBar from './components/TopBar'

const DashBoard: React.FC = () => {
  return (
    <div className="w-full h-screen">
        <div className="flex flex-col">
        <TopBar/>
        </div>
    </div>
  )
}

export default DashBoard
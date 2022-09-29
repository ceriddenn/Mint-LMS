import React from 'react'
import Sidebar from '../../../../../components/core/Sidebar'
import CourseSidebar from '../../../../../components/core/CourseSidebar'
const assignments = () => {
  return (
    <div className='flex bg-gray-500'>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
            <Sidebar/>
            <CourseSidebar/>
            </div>
        </div>
        <div className='flex '>
        <div className='flex flex-row'>
        <h1 className='text-2xl text-white font-extrabold pt-6 pl-12 pr-4'>Assignments</h1>
        <span class="h-7 p-0.5 bg-gray-600  mt-7 "></span>
        <span className='text-2xl text-white font-extrabold pt-6 pl-4 pr-4'></span>
        </div>
        </div>
    </div>
  )
}

export default assignments
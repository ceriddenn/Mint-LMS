import React, {useState, useEffect} from 'react'
import Sidebar from '../../../../../components/core/Sidebar'
import {useRouter} from 'next/router'
import {getCourseDataFromId} from '../../../../../services/client/helpers'
import CourseSidebar from '../../../../../components/core/CourseSidebar'
const feed = () => {
    const {query} = useRouter()
    const router = useRouter()
    const [courseData, setCourseData] = useState()
    useEffect(() => {
        if (!router.isReady) return
        async function getCourseData() {
            const courseId = localStorage.getItem('currentCourse')
            console.log(courseId)
            const data = await getCourseDataFromId(courseId)
            setCourseData(data)
        }
        getCourseData()
    }, [router.isReady])
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
        <h1 className='text-2xl text-white font-extrabold pt-6 pl-12 pr-4'>Course</h1>
        
        <span class="h-7 p-0.5 bg-gray-600  mt-7 "></span>
        <span className='text-2xl text-white font-extrabold pt-6 pl-4 pr-4'></span>
        
        </div>
        </div>
    </div>
  )
}

export default feed
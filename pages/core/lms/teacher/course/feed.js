import React, {useState, useEffect} from 'react'
import Sidebar from '../../../../../components/core/Sidebar'
import {useRouter} from 'next/router'
import {ArrowPathIcon} from "@heroicons/react/24/outline"
import {getCourseDataFromId} from '../../../../../services/client/helpers'
import CourseSidebar from '../../../../../components/core/CourseSidebar'
const feed = () => {
    const {query} = useRouter()
    const router = useRouter()
    const [assignmentData, setAssignmentData] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!router.isReady) return
        async function getCourseData() {
            const courseId = localStorage.getItem('currentCourse')
            console.log(courseId)
            const data = await getCourseDataFromId(courseId)
            setAssignmentData(data.assignments)
        }
        getCourseData()
        setIsLoading(false)
    }, [router.isReady, refresh])

    function handleLateAssignmentClick(event, id) {
        event.preventDefault()
        router.push(`/core/lms/teacher/course/assignments/view?id=${id}`)
    }
    function calculateLate(id) {
      var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
      const date = new Date(today)
      const asDue = new Date(id)
      console.log(date.getTime() > asDue.getTime())
      return date.getTime() > asDue.getTime();
    }
  return (
    <>
    {!isLoading &&
    <div className='flex flex-col bg-gray-500 flex-nowrap grow-0'>
    <div className='flex flex-row h-screen '>
      
    <Sidebar/>
    <CourseSidebar/>
    <div className='flex flex-col'>
    <div className='flex flex-row'>
    <h1 className='text-2xl text-white font-extrabold pt-6 pl-12 pr-4'>TeacherDashboard</h1>
    <span class="h-7 p-0.5 bg-gray-600  mt-7 "></span>
    </div>
    <div className='flex flex-row'>
    
    </div>
    <h1 className='ml-12 mt-6'>Assignements Recently Submitted Marked as Late</h1>
    {assignmentData && assignmentData.map(assignment => {
      return (
    <div onClick={event => handleLateAssignmentClick(event, assignment.asId)} class="ml-12 mx-auto my-4 flex h-fit w-[780px] rounded-lg bg-gray-300 font-serif text-black shadow-xl flex-row transition ease-in-out hover:scale-105 duration-200 cursor-pointer hover:bg-gray-400">
  <div class="mt-4 flex flex-row">
  <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 mt-2 mb-5 ml-6  rounded dark:bg-red-200 dark:text-red-900">LATE</span>

    <h1 class="mx-11 font-bold text-[20px] text-gray-600">{assignment.asId}</h1>
  </div>
  <div class="mx-11 mb-4 text-sm text-gray-500 mt-6"><p>Submitted by: <span className='text-black font-bold'>{calculateLate(assignment.asDueDate)}</span></p></div>
</div>)})}
    </div>
    
    
    </div>
    
</div>}
    </>
  )
}

export default feed
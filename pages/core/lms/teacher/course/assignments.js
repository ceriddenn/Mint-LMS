import React, {useState, useEffect} from 'react'
import Sidebar from '../../../../../components/core/Sidebar'
import CourseSidebar from '../../../../../components/core/CourseSidebar'
import {EyeSlashIcon, EyeIcon} from '@heroicons/react/24/outline'
import {MinusCircleIcon} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import supabase from '../../../../../services/client/supabase'
const assignments = () => {

  //var and states
  const [assignments, setAssignments] = useState([])
  const router = useRouter()
  //functions
  const handleAssignmentCreation = (event) => {
    event.preventDefault();
    router.push("/core/lms/teacher/course/assignments/create")
  }
  useEffect(() => {
    //get assignments from database
    async function getAssignments() {
      const currCourseId = localStorage.getItem("currentCourse")
      await supabase.from("courses").select("*").match({courseId: currCourseId}).then(res => {
        setAssignments(res.data[0].assignments)
      })
    }
    getAssignments()
    //setAssignments()
  }, [])
  async function handlePublish(event, id) {
    event.preventDefault()
    let arr = assignments;
    for (var i=0; i<assignments.length; i++) {
      if (assignments[i].asId == id) {
        arr[i].isPublished = true
        break;
      }
    }
    await supabase.from("courses").update({assignments: arr}).match({courseId: localStorage.getItem("currentCourse")}).then(res => {
      if (!res.error) window.location.reload()
    })
  }

  async function handleUnPublish(event, id) {
    event.preventDefault()
    let arr = assignments;
    for (var i=0; i<assignments.length; i++) {
      if (assignments[i].asId == id) {
        arr[i].isPublished = false
      }
    }
    await supabase.from("courses").update({assignments: arr}).match({courseId: localStorage.getItem("currentCourse")}).then(res => {
      if (!res.error) window.location.reload()
    })
  }
  async function handleAssignmentDeletion(event, id) {
    event.preventDefault()
    let arr = assignments;
    for (var i=0; i<assignments.length; i++) {
      if (assignments[i].asId == id) {
        arr.splice(i, 1)
      }
    }
    await supabase.from("courses").update({assignments: arr}).match({courseId: localStorage.getItem("currentCourse")}).then(res => {
      if (!res.error) window.location.reload()
    })
  }

  return (
    <div className='flex bg-gray-500'>
        <div className='flex flex-col'>
            <div className='flex flex-row h-screen fixed left-0'>
            <Sidebar/>
            <CourseSidebar/>
            </div>
        </div>
        <div className='flex flex-col  mx-auto min-h-screen'>
        <div className='flex flex-row'>
        <h1 className='text-2xl text-white font-extrabold pt-6 pl-12 pr-4'>Assignments</h1>
        <span class="h-7 p-0.5 bg-gray-600  mt-7 "></span>
        <div className='flex flex-col'>
        <button type="button" class="mt-6 ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={event => handleAssignmentCreation(event)}>Create an Assignment</button>
        </div>
        </div>
        {assignments && assignments.map(assignment => {
      return (
        <div className='flex flex-row'>
    <div onClick={event => handleAssignmentClick(event)} class="flex ml-12 mx-auto my-4 flex h-fit w-[780px] rounded-lg bg-gray-300 font-serif text-black shadow-xl flex-row transition ease-in-out hover:scale-105 duration-200 cursor-pointer hover:bg-gray-400">
  <div class="mt-4 flex flex-row">
  {assignment.isPublished ? 
  <span class="bg-red-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 mt-2 mb-5 ml-6  rounded dark:bg-green-200 dark:text-green-900">Published</span>
  :
  <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 mt-2 mb-5 ml-6  rounded dark:bg-red-200 dark:text-red-900">Not Published</span>
        }
    <h1 class="mx-11 font-bold text-[20px] text-gray-600">{assignment.asName}</h1>
  </div>
  <div class="flex mx-11 mb-4 text-sm text-gray-500 mt-6 align-items-end justify-end"><p>Students Completed: <span className='text-black font-bold'>{assignment.students.length}</span></p></div>
</div>
<div className='flex flex-row'>
{assignment.isPublished ? <EyeIcon color='black' className='h-7 w-7 ml-4 mt-8 cursor-pointer' onClick={event => handleUnPublish(event, assignment.asId)}/> : <EyeSlashIcon color='black' className='h-7 w-7 mt-8 ml-4 cursor-pointer' onClick={event => handlePublish(event, assignment.asId)}/>}
<MinusCircleIcon color='black' className='h-7 w-7 ml-4 mt-8 cursor-pointer' onClick={event => handleAssignmentDeletion(event, assignment.asId)}/>
</div>
</div>)})}
        </div>
    </div>
  )
}

export default assignments
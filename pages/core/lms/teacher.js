import React, {useEffect, useState} from 'react'
import Header from '../../../components/core/Header'
import supabase from '../../../services/client/supabase'
import {useRouter} from 'next/router'
import Sidebar from '../../../components/core/Sidebar'
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import {fetchUserCourses} from '../../../services/client/helpers'
const teacher = () => {
    const router = useRouter()
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const session = supabase.auth.session()
        if (!session) {
            console.log('no user')
            router.push('/auth/signup')
        } else {
            console.log('user is logged in')
        }
        async function fetchUser() {
            await supabase.from("users").select("*").eq("userId", supabase.auth.user().id).then(res => {
                if (!res.data[0].isTeacher && router.pathname == '/core/lms/teacher') {
                    router.push('/core/lms/student')
                } 
            })
        }
        fetchUser()
        async function fetchUserCoursesHelper() {
            const data = await fetchUserCourses(session.user.id)
            setCourses([...courses, data])
        }
        fetchUserCoursesHelper()
    }, [])
    const handleCourseCreation = (event) => {
        event.preventDefault()
    }
    const setCurrentCourse = (event, courseId) => {
        event.preventDefault()
        localStorage.setItem('currentCourse', courseId)
        router.push('/core/lms/teacher/course/feed')
    }
  return (
    <div className='flex flex-col bg-gray-500'>
        <div className='flex flex-row h-screen '>
          
        <Sidebar/>
        <div className='flex flex-col'>
        <div className='flex flex-row'>
        <h1 className='text-2xl text-white font-extrabold pt-6 pl-12 pr-4'>TeacherDashboard</h1>
        <span class="h-7 p-0.5 bg-gray-600  mt-7 "></span>
        </div>
        <div className='flex flex-row'>
        <h1 className='mt-6 ml-12 text-2xl font-bold text-white'>Courses:</h1>
        {/*<ArrowDownIcon color='black' height={22} width={22} className="mt-8 ml-2" />
        <ArrowRightIcon color='black' height={22} width={22} className="mt-8 ml-2" />
        */}
        </div>
        {courses[0] ? courses.map(c => {
            return (
        <div className='flex flex-col mt-6 ml-12'>
        <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{c.courseName}</h5>
    </a>
    <p class="mb-1 font-bold text-gray-700 dark:text-gray-400">Students: 
    <span>{c.students ? c.students.reduce((counter, obj) => {
            counter += 1
            return counter;
}, 0) : 0}
    </span>
    </p>

    {c.isAPLevel &&
    <p class="mb-2 font-bold text-gray-700 dark:text-gray-400">AP CLASS</p>}

    {c.isHLevel &&
    <p class="mb-2 font-bold text-gray-700 dark:text-gray-400">Honors CLASS</p>}

    {c.isCPLevel &&
    <p class="mb-2 font-bold text-gray-700 dark:text-gray-400">CP CLASS</p>}    
    <a onClick={event => setCurrentCourse(event, c.courseId)} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Go to course
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>
        </div>)}) : <button type="button" class=" ml-12 mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={event => handleCourseCreation(event)}>Create a course</button>
}
        </div>
        
        
        </div>
        
    </div>
  )
}

export default teacher
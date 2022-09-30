import Image from 'next/image'
import MintStal from '../../../../public/site_icons/MINT_LOGO_STAL.png'
import React, { useState, useEffect } from 'react'
import supabase from '../../../../services/client/supabase'
import {uuid} from 'uuidv4'
import { useRouter } from 'next/router'
import {isUserTeacher} from '../../../../services/client/helpers'
const createcourse = () => {
  const router = useRouter()
  useEffect(() => {
    async function check() {
      const session = supabase.auth.session().user.id
      const data = await isUserTeacher(session)
      if (!data) {
        router.push('/core/lms/student')
      }
    }
    check()
  }, [])

  const [info, setInfo] = useState(false)
  const [isJoinCode, setIsJoinCode] = useState(false)
  const [joinCodePH, setJoinCodePH] = useState("")
  const [checked, setChecked] = useState(false)

  const handleCourseCreation = async (event) => {
    event.preventDefault()
    const courseName = event.target.course_name.value
    const period = event.target.period_block.value
    const courseType = event.target.course_type.value
    const isJoinableByCode = event.target.course_joinCode.checked
    const courseCode = event.target.course_code?.value
    const session = supabase.auth.session()
    //console.log("Course Name: " + courseName + "\n" + "Period: " + period + "\n" + "Joinable by Code: " + isJoinableByCode + "\n" + "Course Code: " + courseCode)
      if (courseType == "AP") {
      await supabase.from('courses').insert({courseId: uuid(), courseName: courseName, period: period, isAPLevel: true, isJoinableByCode: isJoinableByCode, joinCode: joinCodePH + courseCode, instructor: session.user.id}).then(res => {
        if (!res.error) router.push('/core/lms/teacher')
      })
    } else if (courseType == "CP") {
      await supabase.from('courses').insert({courseId: uuid(), courseName: courseName, period: period, isCPLevel: true, isJoinableByCode: isJoinableByCode, joinCode: joinCodePH + courseCode, instructor: session.user.id}).then(res => {
        if (!res.error) router.push('/core/lms/teacher')
      })
    } else if (courseType == "H") {
      await supabase.from('courses').insert({courseId: uuid(), courseName: courseName, period: period, isHLevel: true, isJoinableByCode: isJoinableByCode, joinCode: joinCodePH + courseCode, instructor: session.user.id}).then(res => {
        if (!res.error) router.push('/core/lms/teacher')
      })
    }
  }
  const showInfo1 = (event) => {
    event.preventDefault()
    if (info) {
      setInfo(false)
    } else {
      setInfo(true)
    }
    
  }
  const handleJoinCodeLogin = (event) => {
    event.preventDefault();
    if (checked) {
      setJoinCodePH("")
      setIsJoinCode(false)
      setChecked(false)
    } else {
      setChecked(true)
      var fourDigiNum = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      setJoinCodePH(fourDigiNum)
      setIsJoinCode(true)
    }
  }
  return (
    <div className='flex flex-col bg-gray-900 h-screen'>
      <div className='flex flex-col justify-center items-center mx-auto'>
      <h1 className='text-white text-2xl font-bold mt-5'>Create a Course</h1>
      <div className='flex flex-row space-x-2'>
      <h3 className='text-gray-300 font-semibold mt-1 text-lg'>Powered by </h3>
      <Image src={MintStal} height={15} width={30} className='ml-4'/>
      </div>
      <div className='flex'>
      <form onSubmit={event => handleCourseCreation(event)}>
    <div class="grid gap-6 mb-6 md:grid-cols-2 pt-16">
        <div>
            <label for="course_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course Type</label>
            <select type="text" id="course_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Class Selection" required selected>
            <option value="" disabled selected>Choose AP, H, or CP</option>
            <option value="CP">CP (College Prep)</option>
            <option value="H">H (Honors)</option>
            <option value="AP">AP (Advanced Placement)</option>
            </select>
        </div>
        <div>
            <label for="period_block" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What period does this course occur in?</label>
            <input type="text" id="period_block" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Period/block ie. 4B" required/>
        </div>
    </div>
    <div class="mb-6">
        <label for="course_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course Name</label>
        <input type="text" id="course_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chemistry Honors" required/>
    </div>
    <div className='flex flex-row'> 
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer mb-6">
        <input type="checkbox" value="" id="course_joinCode" class="sr-only peer" checked={checked}/>
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" onClick={event => handleJoinCodeLogin(event)}></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2" >Course joinable by code?</span>
    </label>
    <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-600 dark:text-gray-600 cursor-pointer hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" onClick={event => showInfo1(event)}></path></svg>

    </div>
    {info && <h1 className='mb-3 text-white text-md font-bold'>If this is enabled, students can join the course by a custom code. <br/>Otherwise the instructor will have to manually add them</h1>}
    {isJoinCode && <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Join Code</label>
        <div type="password" id="password" class="flex flex-row items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <h1 className='text-center bg-gray-800 rounded-lg text-gray-600 py-2 px-1'>{joinCodePH}</h1>
        <h1 className='ml-1'>-</h1>
        <input type="text" id="course_code" class="bg-gray-50 text-gray-900 text-sm rounded-lg py-1 pl-1 block w-full dark:bg-gray-700 focus:outline-none dark:placeholder-gray-400 dark:text-white " placeholder="chemistry4B" required/>
        </div>
    </div> }
    <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I certify <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">I am the instructor of this course.</a>.</label>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Course</button>
</form>
      </div>
      </div>
    </div>
  )
}

export default createcourse
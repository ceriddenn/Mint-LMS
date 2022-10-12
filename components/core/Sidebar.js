import React, {useState, useEffect} from 'react'
import {BookOpenIcon, EnvelopeIcon, ClipboardDocumentListIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, HomeIcon, AcademicCapIcon} from '@heroicons/react/24/outline'
import MintStal from '../../public/site_icons/MINT_LOGO_STAL.png'
import Image from 'next/image'
import supabase from '../../services/client/supabase'
import {useRouter} from 'next/router'
const Sidebar = () => {
    const [selected, setSelected] = useState(false)
    const [userType, setUserType] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function getIsTeacher() {
            await supabase.from("users").select("*").eq("userId", supabase.auth.user().id).then(res => {
                if (res.data[0].isTeacher) {
                    setUserType("teacher")
                } else {
                    setUserType("student")
                }
        })
    }
    getIsTeacher()
    }, [])

    return (
    <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 group min-h-screen">
        <div className='flex flex-col justify-between gap-8'>
            <div className='flex items-center group'>
                <Image src={MintStal} height={45} width={45}/>
            </div>
            <div className='flex items-center group'>
            <a href={`/core/lms/${userType}`} class={router.pathname == `/core/lms/${userType}` ? "p-2 rounded-lg bg-gray-500 dark:bg-gray-500 hover:bg-gray-500" : "p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-500" }>
                <HomeIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Home</h1>

            </div>
            <div className='flex items-center group'>
            <a href={`/core/lms/${userType}/allcourses`} class={router.pathname == "/core/lms/student/allcourses" ? "p-2 rounded-lg bg-gray-500 dark:bg-gray-500 hover:bg-gray-500" : "p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-500" }>
                <BookOpenIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Courses</h1>

            </div>

            <div className='flex items-center group'>
            <a href={`/core/lms/${userType}/grades`} class={router.pathname == "/core/lms/student/grades" ? "p-2 rounded-lg bg-gray-500 dark:bg-gray-500 hover:bg-gray-500" : "p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-500" }>
                <AcademicCapIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Grades</h1>

            </div>
            <div className='flex items-center group'>
            <a href={`/core/lms/${userType}/todo`} class={router.pathname == "/core/lms/student/todo" ? "p-2 rounded-lg bg-gray-500 dark:bg-gray-500 hover:bg-gray-500" : "p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-500" }>
                <ClipboardDocumentListIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Todo</h1>

            </div>
        </div>
        <div className='flex items-center group pt-44'>
            <a href={`/core/lms/${userType}/account`} class={router.pathname == "/core/lms/student/account" ? "p-2 rounded-lg bg-gray-500 dark:bg-gray-500 hover:bg-gray-500" : "p-2 rounded-lg bg-gray-700 dark:bg-gray-700 hover:bg-gray-500" }>
                <UserCircleIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Account</h1>
        </div>
        <div className='flex items-center pt-12'>
            <a href="/" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-500" onClick={() => supabase.auth.signOut()}>
                <ArrowLeftOnRectangleIcon width={30} height={30}/>
            </a>
            <h1 className='hidden group-hover:block text-gray-800 ml-5 bg-blue-400 py-1 px-3 rounded-md text-md'>Signout</h1>
            </div>
            
    </div>
  )
}

export default Sidebar
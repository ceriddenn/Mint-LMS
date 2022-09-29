import React, {useEffect} from 'react'
import Header from '../../../components/core/Header'
import supabase from '../../../services/client/supabase'
import {useRouter} from 'next/router'
import Sidebar from '../../../components/core/Sidebar'
const student = () => {
    const router = useRouter()
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
                if (res.data[0].isTeacher && router.pathname == '/core/lms/student') {
                    router.push('/core/lms/teacher')
                } 
            })
        }
        fetchUser()
    }, [])
  return (
    <div className='flex flex-col bg-gray-500'>
        <div className='flex flex-row min-h-screen '>
        <Sidebar/>
        </div>
    </div>
  )
}

export default student
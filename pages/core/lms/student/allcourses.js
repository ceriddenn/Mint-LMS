import React from 'react'
import supabase from '../../../../services/client/supabase'
import Sidebar from '../../../../components/core/Sidebar'
const allcourses = () => {
  return (
    <div className='flex flex-row'>
        <Sidebar/>
    </div>
  )
}

export default allcourses
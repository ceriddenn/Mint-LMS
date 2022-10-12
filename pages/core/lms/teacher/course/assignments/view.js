import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../../../../../../components/core/Sidebar'
import CourseSidebar from '../../../../../../components/core/CourseSidebar'
import {getAssignmentDataFromId} from '../../../../../../services/client/helpers'
const view = () => {
    const {query} = useRouter()
    const router = useRouter()
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        let lId = localStorage.getItem("currentCourse")
        console.log(lId, query.id)
    }, [refresh])
    async function handleQuery(e) {
      e.preventDefault()
      const data = await getAssignmentDataFromId(query.id, localStorage.getItem("currentCourse"))
      console.log(data)
    }
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row h-screen fixed'>
        <Sidebar />
        <CourseSidebar />
        <div className='flex flex-col'>
        {/*<button onClick={() => setRefresh(refresh + 1)}>refresh</button>*/}
        <button onClick={event => handleQuery(event)}>query</button>
        </div>
      </div>
    </div>
  )
}

export default view
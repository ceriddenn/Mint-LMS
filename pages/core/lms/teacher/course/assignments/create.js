import Image from 'next/image'
import React, {useState} from 'react'
import MintStal from '../../../../../../public/site_icons/MINT_LOGO_STAL.png'
import {uuid} from 'uuidv4'
import {useRouter} from 'next/router'
import supabase from '../../../../../../services/client/supabase'
import assignments from '../assignments'
// assignment JSON
/* {
    "asName": "cool",
    "asId": "",
    "asDescription": "",
    "asSubmitionOptions": [
      {
        "type": "drive"
      },
      {
        "type": "link"
      },
      {
        "type": "video/photo"
      }
    ],
    "asDueDate": "",
    "asTotalPoints": "",
    "isPublished": "",
    "students": [
      {
        "userId": "",
        "grade": "",
        "submittedBy": ""
      }
    ]
  } */
const create = () => {
  // vars and states
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(false)
  //assignment submit states
  const router = useRouter()
  //functions

  //set assignment locals

  const handleAssignmentCreation = async (event) => {
    event.preventDefault()
    const publish = event.target.assignment_publish.checked
    const name = event.target.assignment_name.value
    const selected = event.target.assignment_type.value
    const description = event.target.assignment_description.value
    const duedate = event.target.assignment_duedate.value
    const points = event.target.assignment_totalpoints.value
    //
    const currCourseId = localStorage.getItem('currentCourse')
    let courseAssignments;
    await supabase.from("courses").select("*").match({courseId: currCourseId}).then(res => {
      courseAssignments = res.data[0].assignments
    })
    courseAssignments.push({
      "asName": name,
      "asId": uuid(),
      "asDescription": description,
      "asSubmitionOptions": [
        {
          "type": `${selected}` 
        }
      ],
      "asDueDate": duedate,
      "asTotalPoints": points,
      "isPublished": publish,
      "students": []
    })
    await supabase.from("courses").update({assignments: courseAssignments}).match({courseId: currCourseId}).then(res => {
      if (res.error) {
        setError(true)
        return;
      } else {
        setError(false)
        router.push('/core/lms/teacher/course/assignments')
      }
    })
    
  }

  const togglePublishAfterCreation = (event) => {
    event.preventDefault()
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  return (
    <div className='flex flex-col bg-gray-900 h-screen'>
      <div className='flex flex-col justify-center items-center mx-auto'>
      <h1 className='text-white text-2xl font-bold mt-5'>Create an Assignment</h1>
      <div className='flex flex-row space-x-2'>
      <h3 className='text-gray-300 font-semibold mt-1 text-lg'>Powered by </h3>
      <Image src={MintStal} height={15} width={30} className='ml-4'/>
      </div>
      {error &&
      <h1 className='text-red-600 text-md font-bold'>Error: Please check that you filled out all of the information. <br/>If this continues it may be a problem with our services. </h1>
    }
      <div className='flex'>
      <form onSubmit={event => handleAssignmentCreation(event)}>
    <div class="grid gap-6 mb-6 md:grid-cols-2 pt-16">
        <div>
            <label for="assignment_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Assignment Submition Types</label>
            <select type="text" id="assignment_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Assignment Submition Selection" required selected>
            <option value="" disabled selected>Choose a submition option</option>
            <option value="google_apps">Google Apps</option>
            <option value="link">Link</option>
            <option value="video_photo">Video or Photo Upload</option>
            </select>
        </div>
        <div>
            <label for="assignment_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What should this assignment be titled?</label>
            <input type="text" id="assignment_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Algebra Worksheet" required/>
        </div>
    </div>
    <div class="mb-6">
        <label for="assignment_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Instructions or a description for this assignment</label>
        <input type="text" id="assignment_description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Students should click this link to fill out the google doc and then upload it here." required/>
    </div>
    <div className='flex flex-col justify-left'>
    <div class="mb-6">
        <label for="assignment_duedate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Assignment Due Date</label>
        <input type="date" id="assignment_duedate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    </div>
    <div class="mb-6">
        <label for="assignment_totalpoints" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Points for this assignment</label>
        <input type="number" id="assignment_totalpoints" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. 100, 50, 10" required/>
    </div>
    </div>
    <div className='flex flex-row'> 
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer mb-6">
        <input type="checkbox" value="" id="assignment_publish" class="sr-only peer" checked={checked}/>
        <div onClick={event => togglePublishAfterCreation(event)} class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2" >Publish after creation?</span>
    </label>

    </div>
    <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    
    <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Assignment</button>
</form>
      </div>
      </div>
    </div>
  )
}

export default create
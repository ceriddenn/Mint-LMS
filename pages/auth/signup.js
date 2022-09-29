import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import supabase from '../../services/client/supabase'
import MINTLSL from '../../public/site_icons/MINT_LOGO_STAL.png'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { uuid } from 'uuidv4'
const signup = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const createDatabaseProfile = async (user) => {
    await supabase.from('users').insert(user).then(res => {
      if(!res.error) {
        console.log("success creating user profile!")
        if (user.isTeacher) {
          router.push('/core/lms/teacher')
        } else {
        router.push('/core/lms/student')
        }
        setError(false)
        setSuccess(true)
      } else {
        console.log("error creating user profile")
        setSuccess(false)
        setError(true)
      }
    })

  }
  const handleSignup = async (e) => {
    setError(false)
    setSuccess(false)
    const data = [{"asName": "", "asId": "", "asDescription": "", "asSubmitionOptions": [{"type": "drive"}, {"type": "link"}, {"type": "video/photo"}], "asDueDate": "", "asTotalPoints": "", "isPublished": "", "students": [{"userId": "", "grade": "", "submittedBy": ""}]}]
    console.log(data)
    e.preventDefault();
    console.log('Trying to signup...');
    const email = e.target.email.value;
    const teacher = e.target.teacher.checked;
    const password = e.target.password.value;
    const confirmedPassword = e.target.repeat_password.value
    if (password !== confirmedPassword) {
      setError(true)
      return;
    }
    let userId;
    await supabase.auth.signUp({email, password}).then(res => {
      if (!res.error) {
        setError(false)
        setSuccess(true)
      userId = res.user.id;
      console.log("Signup successful!");
      console.log("attempting to create user profile for LMS");
      } else {
        console.log("Error. Signup failed.");
        setSuccess(false)
        setError(true)
      }
    });

    const someJson = {"userId": userId, "email": email, "isTeacher": teacher}
    createDatabaseProfile(someJson)
  }
  return (
    <div className='flex flex-row justify-center h-screen mx-auto items-center bg-gray-900'>
      {success && 
      <div id="alert-additional-content-3" class="p-4 mb-4 border border-green-300 rounded-lg bg-green-50 dark:bg-green-200 fixed right-0 top-0 mr-12 mt-12" role="alert">
  <div class="flex items-center">
    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Info</span>
    <h3 class="text-lg font-medium text-green-700 dark:text-green-800">Signup was successful!</h3>
  </div>
  <div class="mt-2 mb-4 text-sm text-green-700 dark:text-green-800">
    Well redirect you in a second! Thanks for choosing Mint LMS <Image src={MINTLSL} height={20} width={18} className="pt-2"/>
  </div>
  <div class="flex">
    <button type="button" class="text-green-700 bg-transparent border border-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-green-800 dark:text-green-800 dark:hover:text-white" data-dismiss-target="#alert-additional-content-3" aria-label="Close" onClick={() => {setSuccess(false)}}>
      Dismiss
    </button>
  </div>
</div>}
{error &&
  <div id="alert-additional-content-2" class="p-4 mb-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-200 fixed right-0 top-0 mr-12 mt-12" role="alert">
  <div class="flex items-center">
    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-red-900 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Info</span>
    <h3 class="text-lg font-medium text-red-900 dark:text-red-800">An error occured.</h3>
  </div>
  <div class="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
    - Is your password at least 6 characters long?<br/>
    - Do your passwords match?<br/>
    - Did you agree to the terms and conditions?
  </div>
  <div class="flex">
    <button type="button" class="text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white" onClick={() => {setError(false)}} data-dismiss-target="#alert-additional-content-2" aria-label="Close">
      Dismiss
    </button>
  </div>
</div>
}
      <Head>
        <title>Mint LMS</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      
      <form onSubmit={event => handleSignup(event)}>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
    <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
    <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div class="mb-6">
    <label for="repeat_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
    <input type="password" id="repeat_password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="teacher" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
    </div>
    <label for="teacher" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I am a <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">teacher</a></label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>
    </div>
  )
}

export default signup
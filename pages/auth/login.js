import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import supabase from '../../services/client/supabase'
import MINTLSL from '../../public/site_icons/MINT_LOGO_STAL.png'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { uuid } from 'uuidv4'
const login = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }
  const handleSignup = async (e) => {
    setError(false)
    setSuccess(false)
    e.preventDefault();
    console.log('Trying to login...');
    const email = e.target.email.value;
    const password = e.target.password.value;
    let userId;
    await supabase.auth.signIn({email, password}).then(async res => {
      if (!res.error) {
        setError(false)
        setSuccess(true)
      userId = res.user.id;
      console.log("Login successful!");
      await delay(2000)
      if (res.user.isTeacher) {
        router.push('/core/lms/teacher')
      } else {
        router.push('/core/lms/student')
      }
      } else {
        console.log("Error. Signup failed.");
        setSuccess(false)
        setError(true)
      }
    });
  }
  return (
    <div className='flex flex-row justify-center h-screen mx-auto items-center bg-gray-900'>
      {success && 
      <div id="alert-additional-content-3" class="p-4 mb-4 border border-green-300 rounded-lg bg-green-50 dark:bg-green-200 fixed right-0 top-0 mr-12 mt-12" role="alert">
  <div class="flex items-center">
    <svg aria-hidden="true" class="w-5 h-5 mr-2 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Info</span>
    <h3 class="text-lg font-medium text-green-700 dark:text-green-800">Login was successful!</h3>
  </div>
  <div class="mt-2 mb-4 text-sm text-green-700 dark:text-green-800">
    Redirecting to home! Thanks for choosing Mint LMS <Image src={MINTLSL} height={20} width={18} className="pt-2"/>
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
    - Are your credentials correct?<br/>
    - Did you change your password recently?<br/>
    - Still can't login? Contact us at support@auth.mintlms.net
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
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
</form>
    </div>
  )
}

export default login
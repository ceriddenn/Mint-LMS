import Image from 'next/image'
import MintStal from '../../../../public/site_icons/MINT_LOGO_STAL.png'
import React, { useState, useEffect } from 'react'
import supabase from '../../../../services/client/supabase'
const createcourse = () => {
  return (
    <div className='flex flex-col bg-gray-900 h-screen'>
      <div className='flex flex-col justify-center items-center mx-auto'>
      <h1 className='text-white text-2xl font-bold mt-5'>Create a Course</h1>
      <div className='flex flex-row'>
      <h3 className='text-gray-300 font-semibold mt-1 text-lg'>Powered by </h3>
      <Image src={MintStal} height={20} width={30} className='ml-2'/>
      </div>
      
      </div>
    </div>
  )
}

export default createcourse
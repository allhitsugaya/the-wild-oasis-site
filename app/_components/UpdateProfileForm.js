'use client'

import React, { useState } from 'react';
import { updataProfile } from '@/app/_lib/actions';
import { useFormStatus} from 'react-dom'
import SubmitButton from '@/app/_components/SubmitButton';
import Image from 'next/image';
function UpdateProfileForm({children, guest}) {
  const [count, setCount] = useState();
const {fullName, email, nationality, nationalID, countryFlag} = guest;


  return (
    <form action={updataProfile} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className='relative'>
            <Image
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm object-cover"
            />
          </div>
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel={'Updating...'} >
          Update Profile
        </SubmitButton>
      </div>
    </form>
  );
}




export default UpdateProfileForm;

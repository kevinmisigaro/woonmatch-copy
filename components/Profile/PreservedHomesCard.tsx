import React from 'react'

export default function PreservedHomesCard() {
  return (
    <div className="block w-full bg-white rounded-md shadow-md mb-7">
    <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
      Mijn bewaarde woningen
    </div>
    <div className="text-sm px-6 py-4 text-black bg-profile-ring font-normal items-center flex flex-row gap-x-24 justify-between">
      <div>
        <p>
           Motorwal 89 <br/>
           <span className='font-light'>Amsterdam-Noord</span>
        </p>
        <hr className='my-2' />
        <p>
        Motorwal 89 <br/>
           <span className='font-light'>Amsterdam-Noord</span>
        </p>

        
      </div>

      <div className="pr-6">
        <img src="/bg-images/profile/heart-full.svg" className="w-8" />
      </div>
    </div>
  </div>
  )
}

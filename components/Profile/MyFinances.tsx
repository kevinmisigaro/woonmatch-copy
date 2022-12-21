import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

export default function MyFinances() {
  return (
    <>
      <div className="block w-full bg-white rounded-md shadow-md mb-7 relative overflow-hidden">
        <div className="py-4 pl-4 rounded-t-md bg-tertiary text-base text-white">
      Inschrijfgeld
      </div>
      <div className="text-sm px-6 py-4 text-black font-normal items-center flex flex-row gap-x-24 justify-between">
          <div>
            <p className='font-light'>Inschrijfgeld: <span className='font-medium'>€ 15,(betaald)</span></p>
            <hr className="my-2" />
            <p className='font-light'>Openstaand saldo: <span className='font-medium'>€ 10</span></p>
            <div
              className="text-sm mt-5 group text-primary flex items-center flex-row justify-start gap-x-1 font-light cursor-pointer hover:underline">
              Overzicht{" "}
              <span className="hidden group-hover:block underline">
                <BsArrowRight size={12} />
              </span>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2">
            <img src="/bg-images/profile/Inschrijfgeld.svg" className="w-40" />
          </div>
        </div>
    </div>
  </>
  )
}

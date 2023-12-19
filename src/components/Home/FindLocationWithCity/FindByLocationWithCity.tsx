import React from 'react'

interface IFindLocationWithCityProps {
  handleSetCity: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFindLocation: () => Promise<void>
}

export const FindLocationWithCity = ({
  handleSetCity,
  handleFindLocation,
}: IFindLocationWithCityProps) => {
  return (
    <div className='flex flex-col items-center justify-between my-5 w-full mx-auto bg-sky-600 h-auto md:h-48 p-10 rounded-lg'>
      <p className='px-3 text-xl font-medium text-gray-300 dark:text-white'>
        Unfortunately, we were unable to locate your location. Please enter your
        city instead.
      </p>
      <div className='flex w-full lg:w-[70%] flex-col md:flex-row items-center my-4'>
        <input
          autoFocus
          className='w-full my-3 md:my-0 md:w-4/6 border-1 outline-none border-[#ccc] p-4 text-xl font-bold placeholder-gray-950 bg-white mx-1 rounded-lg'
          placeholder='Your city like London'
          onChange={handleSetCity}
        />
        <button
          type='submit'
          className='w-full my-3 md:my-0 md:w-3/6 cursor-pointer border-1 border-[#ccc] p-4 text-xl font-bold text-white bg-slate-700 mx-1 rounded-lg'
          onClick={handleFindLocation}
        >
          Find Location
        </button>
      </div>
    </div>
  )
}

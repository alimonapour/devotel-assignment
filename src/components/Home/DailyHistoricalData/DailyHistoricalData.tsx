import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IDailyHistoricalDataProps } from 'types'

export const DailyHistoricalData = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  fetchHistoricalData,
}: IDailyHistoricalDataProps) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center my-5 w-full lg:w-[90%] xl:w-[80%] mx-auto bg-sky-600 h-auto md:h-32 p-4  rounded-lg'>
      <DatePicker
        placeholderText='Please select start date'
        className='cursor-pointer outline-none border-1 border-[#ccc] py-4 px-2 text-base font-medium placeholder-gray-950 bg-white md:mx-1 lg:mx-4 rounded-lg my-3 md:my-0'
        selected={startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        placeholderText='Please select end date'
        className=' cursor-pointer outline-none border-1 border-[#ccc] py-4 px-2 text-base font-medium placeholder-gray-950 bg-white md:mx-1 lg:mx-4 rounded-lg my-3 md:my-0'
        selected={endDate}
        onChange={handleEndDateChange}
      />
      <button
        className=' cursor-pointer outline-none border-1 border-[#ccc] py-4 px-4 md:px-2 text-base font-medium text-white bg-slate-700 md:mx-1 lg:mx-4 rounded-lg my-3 md:my-0'
        onClick={fetchHistoricalData}
      >
        Get Historical Data
      </button>
    </div>
  )
}

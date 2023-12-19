import { twMerge } from 'tailwind-merge'
import { IOptionsButtonProps } from 'types'

export const OptionButtons = ({
  isSevenDaysForecastError,
  handleShowSevenDaysForecastButtonClick,
  isError,
  handleRefreshButtonClick,
  handleShowWeatherHistoryButtonClick,
}: IOptionsButtonProps) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-around w-full mx-auto my-5'>
      <button
        className={twMerge(
          'w-full md:w-auto p-3 bg-cyan-600 text-white text-base font-bold cursor-pointer rounded-md my-3 md:my-0',
          isSevenDaysForecastError && 'cursor-default bg-gray-500',
        )}
        onClick={handleShowSevenDaysForecastButtonClick}
        disabled={isSevenDaysForecastError}
      >
        Show the 7-day forecast
      </button>
      <button
        className={twMerge(
          'w-full md:w-auto p-3 bg-cyan-600 text-white text-base font-bold cursor-pointer rounded-md my-3 md:my-0',
          isError && 'cursor-default bg-gray-500',
        )}
        onClick={handleRefreshButtonClick}
        disabled={isError}
      >
        Refresh the weather{' '}
      </button>
      <button
        className={twMerge(
          'w-full md:w-auto p-3 bg-cyan-600 text-white text-base font-bold cursor-pointer rounded-md my-3 md:my-0',
        )}
        onClick={handleShowWeatherHistoryButtonClick}
      >
        Show weather history form
      </button>
    </div>
  )
}

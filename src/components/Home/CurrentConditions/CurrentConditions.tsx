import { twMerge } from 'tailwind-merge'
import { ICurrentConditionsPropTypes } from 'types'
import { formatDate } from 'utils'

type dataPropTypes = { data: ICurrentConditionsPropTypes }

export const CurrentConditions = ({ data }: dataPropTypes) => {
  const {
    temp,
    weather,
    app_temp,
    city_name,
    country_code,
    iconUrl,
    localDate,
    isLoading,
    isError,
  } = data
  return (
    <div>
      {isLoading && (
        <h1 className='text-2xl font-bold leading-5 text-center p-2'>
          Loading...
        </h1>
      )}
      {isError && (
        <h1 className='text-base font-bold text-red-700 my-2'>{isError}</h1>
      )}

      {!isLoading && !isError && (
        <div className='bg-white text-black flex flex-col items-center h-fit md:flex-row sm:justify-around my-5 p-5 rounded-xl sm:h-48'>
          <div className='flex flex-col items-center md:flex-row text-xl font-medium md:p-3'>
            <div className='flex items-center'>
              <img
                src={iconUrl}
                alt='current weather icon'
                className='w-14 h-14 mx-2 md:mx-0'
              />

              <div className='flex items-center mx-2 md:mx-0'>
                <h2
                  className={twMerge(
                    'text-3xl md:text-xl lg:text-3xl font-bold text-navy-700 dark:text-white',
                    temp > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
                  )}
                >
                  {temp}{' '}
                </h2>
                <span
                  className={twMerge(
                    'text-lg md:text-xl font-bold text-navy-700 dark:text-white',
                    temp > 0 ? 'text-[#c60000]' : 'text-[#006edb] ml-1',
                  )}
                >
                  °C
                </span>
              </div>
              <p className='mx-2 md:mx-1 lg:mx-3 text-xl md:text-base md:font-semibold lg:font-medium lg:text-xl text-navy-700 dark:text-white'>
                in {city_name}, {country_code}
              </p>
            </div>
          </div>
          <div className='flex items-center sm:flex-row md:items-center md:p-3 my-2 md:my-0'>
            <h2 className='px-3 text-xl font-medium md:text-base md:font-semibold lg:text-xl lg:font-medium text-navy-700 dark:text-white'>
              Feels like{' '}
            </h2>
            <div className='flex items-center'>
              <h2
                className={twMerge(
                  'text-2xl md:text-xl lg:text-2xl font-bold text-navy-700 dark:text-white',
                  app_temp > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
                )}
              >
                {app_temp}
              </h2>
              <span
                className={twMerge(
                  'text-lg md:text-xl font-bold text-navy-700 dark:text-white ml-1',
                  app_temp > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
                )}
              >
                °C
              </span>
            </div>
          </div>
          <p className='px-3 text-xl font-medium md:text-base md:font-semibold lg:text-xl lg:font-medium my-2 md:my-0'>
            {weather?.description}
          </p>
          <h2 className='px-3 text-xl font-medium md:text-base md:font-semibold lg:text-xl lg:font-medium my-2 md:my-0'>
            {formatDate(localDate)}
          </h2>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import {
  useFetchCurrentWeatherData,
  useFetchDailyHistoricalWeatherData,
  useFetchSevenDaysForecastData,
} from 'services/useApi'

import { ILocation, IPositionError } from 'types'

import { SevenDaysForecastView } from 'components/SevenDayForecast'
import { CurrentConditions } from './CurrentConditions'
import { DailyHistoricalData } from './DailyHistoricalData'
import { FindLocationWithCity } from './FindLocationWithCity'
import { OptionButtons } from './OptionButtons'

export const Home: React.FC = () => {
  const [showSevenDaysForecast, setShowSevenDaysForecast] = useState(false)
  const [showHistoricalDataForm, setShowHistoricalDataForm] = useState(false)
  const [showDailyHistoricalWeatherInfo, setShowDailyHistoricalWeatherInfo] =
    useState(false)

  const [location, setLocation] = useState<ILocation | null>(null)
  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const { currentWeatherData, isLoading, isError } =
    useFetchCurrentWeatherData(location)

  const {
    sevenDaysForecastData,
    isLoadingSevenDaysForecastData,
    isSevenDaysForecastDataError,
  } = useFetchSevenDaysForecastData(location)

  const formattedStartDate = startDate
    ? (format(startDate, 'yyyy-MM-dd') as unknown as Date)
    : null

  const formattedEndDate = endDate
    ? (format(endDate, 'yyyy-MM-dd') as unknown as Date)
    : null

  const {
    dailyHistoricalWeatherData,
    isLoadingDailyHistoricalWeatherData,
    isDailyHistoricalWeatherDataError,
  } = useFetchDailyHistoricalWeatherData(
    location,
    formattedStartDate,
    formattedEndDate,
  )

  const weatherData = currentWeatherData?.data

  const { temp, weather, ob_time, app_temp, city_name, country_code } =
    weatherData !== undefined && currentWeatherData?.data[0]

  let localDate = ''
  if (ob_time !== undefined) {
    const [datePart] = ob_time !== undefined && ob_time?.split(' ')
    localDate = datePart
  }

  const iconUrl = `https://www.weatherbit.io/static/img/icons/${weather?.icon}.png`

  const currentConditionsDate = {
    temp,
    weather,
    ob_time,
    app_temp,
    city_name,
    country_code,
    iconUrl,
    localDate,
    isLoading,
    isError,
  }
  const getLocationByIp = async (): Promise<ILocation | null> => {
    try {
      const response = await axios.get('https://ipapi.co/json/')
      const { latitude, longitude } = response.data
      return { coords: { latitude, longitude } }
    } catch (error) {
      console.error('Error getting location by IP:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation((prevLocation) => {
              // Check if the new location is different from the current one
              if (
                prevLocation &&
                position.coords.latitude === prevLocation.coords.latitude &&
                position.coords.longitude === prevLocation.coords.longitude
              ) {
                return prevLocation // No need to update if it's the same location
              }

              return {
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              }
            })
          },
          async (error: IPositionError) => {
            console.error('Error getting location:', error.message)
            const locationByIp = await getLocationByIp()

            // Check if the new location from IP is different from the current one
            if (
              locationByIp &&
              location &&
              locationByIp.coords.latitude === location.coords.latitude &&
              locationByIp.coords.longitude === location.coords.longitude
            ) {
              return
            }

            setLocation(locationByIp)
          },
        )
      } else {
        console.error('Geolocation is not supported by your browser.')
      }
    }

    fetchLocation()
  }, [])

  const handleShowSevenDaysForecastButtonClick = () => {
    setShowSevenDaysForecast(!showSevenDaysForecast)
    setShowHistoricalDataForm(false)
  }

  const handleRefreshButtonClick = () => {
    window.location.reload()
  }

  const handleSetCity = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(event.target.value)
  }

  const handleFindLocation = async () => {
    try {
      const response = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            q: city,
            key: 'b79880f2296b4e35831d766708323392',
          },
        },
      )

      const { lat, lng } = response.data.results[0].geometry
      setLocation({ coords: { latitude: lat, longitude: lng } })
    } catch (error) {
      console.error('Error finding location:', error)
    }
  }

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date)
  }

  const fetchHistoricalData = () => {
    setShowDailyHistoricalWeatherInfo(!showDailyHistoricalWeatherInfo)
  }

  const handleShowWeatherHistoryButtonClick = () => {
    setShowHistoricalDataForm(!showHistoricalDataForm)
    setShowSevenDaysForecast(false)
  }

  useEffect(() => {
    if (startDate && endDate) {
      fetchHistoricalData()
    }
  }, [startDate, endDate])

  return (
    <div className='flex flex-col w-[90%]'>
      <div className='border-b-2 border-indigo-400 w-full'>
        <h1 className='text-3xl font-bold leading-5 text-center p-3'>
          Current conditions
        </h1>
      </div>
      {location && <CurrentConditions data={currentConditionsDate} />}

      {location && (
        <OptionButtons
          isSevenDaysForecastError={isSevenDaysForecastDataError}
          handleShowSevenDaysForecastButtonClick={
            handleShowSevenDaysForecastButtonClick
          }
          isError={isError}
          handleRefreshButtonClick={handleRefreshButtonClick}
          handleShowWeatherHistoryButtonClick={
            handleShowWeatherHistoryButtonClick
          }
        />
      )}

      {!isLoading && !location && (
        <FindLocationWithCity
          handleSetCity={handleSetCity}
          handleFindLocation={handleFindLocation}
        />
      )}

      {showHistoricalDataForm && (
        <DailyHistoricalData
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          fetchHistoricalData={fetchHistoricalData}
        />
      )}

      {location && isSevenDaysForecastDataError && (
        <h2 className='text-base font-bold text-red-700'>
          {isSevenDaysForecastDataError}
        </h2>
      )}

      {!isSevenDaysForecastDataError && showSevenDaysForecast && (
        <div className='flex flex-col items-center'>
          <SevenDaysForecastView
            tableDate={sevenDaysForecastData}
            loading={isLoadingSevenDaysForecastData}
            error={isSevenDaysForecastDataError}
          />
        </div>
      )}

      {startDate && endDate && isDailyHistoricalWeatherDataError && (
        <h2 className='text-base font-bold text-red-700'>
          {isDailyHistoricalWeatherDataError}
        </h2>
      )}

      {!isLoadingDailyHistoricalWeatherData &&
        !isDailyHistoricalWeatherDataError &&
        showDailyHistoricalWeatherInfo &&
        showHistoricalDataForm && (
          <div>
            <SevenDaysForecastView
              tableDate={dailyHistoricalWeatherData}
              loading={isLoadingDailyHistoricalWeatherData}
              error={isDailyHistoricalWeatherDataError}
            />
          </div>
        )}
    </div>
  )
}

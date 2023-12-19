import useSWR from 'swr'
import { PROTOCOL, HOSTNAME, VERSION, API_KEY } from './global'
import { ILocation } from 'types'

const URL = `${PROTOCOL}://${HOSTNAME}/${VERSION}`
const SEVEN_DAYS = 7

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useFetchCurrentWeatherData = (location: ILocation | null) => {
  const { data } = useSWR(
    `${URL}/current?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&key=${API_KEY}`,
    fetcher,
  )

  return {
    currentWeatherData: data,
    isLoading: !data?.error && !data,
    isError: data?.error || data?.status_message,
  }
}

export const useFetchSevenDaysForecastData = (location: ILocation | null) => {
  const { data } = useSWR(
    `${URL}/forecast/daily?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&key=${API_KEY}&days=${SEVEN_DAYS}`,
    fetcher,
  )

  return {
    sevenDaysForecastData: data,
    isLoadingSevenDaysForecastData: !data?.error && !data,
    isSevenDaysForecastDataError: data?.error || data?.status_message,
  }
}

export const useFetchDailyHistoricalWeatherData = (
  location: ILocation | null,
  startDate: Date | null,
  endDate: Date | null,
) => {
  const { data } = useSWR(
    `${URL}/history/daily?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&start_date=${startDate}&end_date=${endDate}&key=${API_KEY}`,
    fetcher,
  )

  return {
    dailyHistoricalWeatherData: data,
    isLoadingDailyHistoricalWeatherData: !data?.error && !data,
    isDailyHistoricalWeatherDataError: data?.error || data?.status_message,
  }
}

export interface ILocation {
  coords: {
    latitude: number
    longitude: number
  }
}

export interface IPositionError {
  code: number
  message: string
}

export interface IOptionsButtonProps {
  isSevenDaysForecastError: boolean
  isError: boolean
  handleShowSevenDaysForecastButtonClick: () => void
  handleRefreshButtonClick: () => void
  handleShowWeatherHistoryButtonClick: () => void
}

export interface IDailyHistoricalDataProps {
  startDate: Date | null
  endDate: Date | null
  handleStartDateChange: (date: Date | null) => void
  handleEndDateChange: (date: Date | null) => void
  fetchHistoricalData: () => void
}

export interface ISevenDaysForecastViewProps {
  tableDate: any
  loading: boolean
  error: boolean
}

interface IWeatherType {
  code: number
  description: string
  icon: string
}

export type IRowObj = {
  datetime: string
  weather: IWeatherType
  temp: number
  max_temp: number
  min_temp: number
  wind_spd: number
}

export interface ICurrentConditionsPropTypes {
  weather: IWeatherType
  temp: number
  app_temp: number
  city_name: string
  country_code: string
  iconUrl: string
  localDate: string
  isLoading: boolean
  isError: boolean
}

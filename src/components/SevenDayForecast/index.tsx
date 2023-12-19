import { SevenDaysForecastTable } from './components'
import Card from 'components/UI/Card'
import { ISevenDaysForecastViewProps } from 'types'

export const SevenDaysForecastView = ({
  tableDate,
}: ISevenDaysForecastViewProps) => {
  return (
    <Card extra={'w-full h-full mt-3'}>
      <SevenDaysForecastTable tableData={tableDate.data} />
    </Card>
  )
}

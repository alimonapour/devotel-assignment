export const formatDate = (inputDate: string): string => {
  const daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  // Parse the input date
  const dateObj: Date = new Date(inputDate)

  // Get day, month, and date components
  const dayOfWeek: string = daysOfWeek[dateObj.getDay()]
  const month: string = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(dateObj)
  const dayOfMonth: number = dateObj.getDate()

  // Format the result
  const formattedDate: string = `${dayOfWeek}, ${month} ${dayOfMonth}`

  return formattedDate
}

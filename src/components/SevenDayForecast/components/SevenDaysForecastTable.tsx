import React from 'react'
import { twMerge } from 'tailwind-merge'
import Card from 'components/UI/Card'
import { IRowObj } from 'types'
import {
  createColumnHelper,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'

import { formatDate } from 'utils'

export const SevenDaysForecastTable = (props: { tableData: IRowObj[] }) => {
  const { tableData } = props

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  let defaultData = tableData
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = [
    columnHelper.accessor('datetime', {
      id: 'datetime',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>DATE</p>
      ),
      cell: (info: any) => (
        <div className='flex w-full items-center gap-[14px]'>
          <p className='font-medium text-navy-700 dark:text-white'>
            {info.getValue() && formatDate(info.getValue())}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('weather', {
      id: 'weather',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>NOW</p>
      ),
      cell: (info: any) => (
        <div className='flex w-full items-center gap-[14px]'>
          <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full'>
            {info.getValue() && info.getValue().icon ? (
              <img
                className='h-full w-full rounded-full'
                src={`https://www.weatherbit.io/static/img/icons/${
                  info.getValue() && info.getValue().icon
                }.png`}
                alt=''
              />
            ) : (
              <img
                className='h-8 w-8 rounded-full'
                src='/faveIcon.png'
                alt=''
              />
            )}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('temp', {
      id: 'temp',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>Temp</p>
      ),
      cell: (info) => (
        <p
          className={twMerge(
            'text-base font-bold text-navy-700 dark:text-white',
            info.getValue() > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
          )}
        >
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('max_temp', {
      id: 'max_temp',
      header: () => (
        <p className='text-sm font-bold uppercase text-gray-600 dark:text-white'>
          Max temp
        </p>
      ),
      cell: (info) => (
        <p
          className={twMerge(
            'text-base font-bold text-navy-700 dark:text-white',
            info.getValue() > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
          )}
        >
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('min_temp', {
      id: 'min_temp',
      header: () => (
        <p className='text-sm font-bold uppercase text-gray-600 dark:text-white'>
          Min temp
        </p>
      ),
      cell: (info) => (
        <p
          className={twMerge(
            'text-base font-bold text-navy-700 dark:text-white',
            info.getValue() > 0 ? 'text-[#c60000]' : 'text-[#006edb]',
          )}
        >
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('wind_spd', {
      id: 'wind_spd',
      header: () => (
        <p className='text-sm font-bold uppercase text-gray-600 dark:text-white'>
          Wind
        </p>
      ),
      cell: (info) => (
        <p className='text-base font-bold text-navy-700 dark:text-white'>
          {info.getValue()} m/s
        </p>
      ),
    }),
  ] // eslint-disable-next-line
  const [data] = React.useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <div className='mt-8 overflow-x-scroll xl:overflow-x-hidden'>
        <table className='w-full'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='!border-px !border-gray-400'>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      // onClick={header.column.getToggleSortingHandler()}
                      className='border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30'
                    >
                      <div className='items-center justify-between text-xs text-gray-200'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className='min-w-[150px] border-white/0 py-3  pr-4 text-start border-b border-gray-300'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

const columnHelper = createColumnHelper<IRowObj>()

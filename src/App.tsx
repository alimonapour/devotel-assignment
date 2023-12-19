import { Home } from 'components/Home'

function App() {
  return (
    <div className='sm:container overflow-hidden w-full lg:w-[90%] mx-auto my-5 py-4 sm:p-10 md:p-5 border bg-gradient-to-b from-blue-100 to-blue-300 border-blue-600 rounded-md bg-white shadow-md shadow-gray-600 flex flex-col items-center'>
      <Home />
    </div>
  )
}

export default App

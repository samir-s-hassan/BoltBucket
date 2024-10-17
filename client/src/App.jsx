import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars/ViewCars'
import EditCar from './pages/EditCar/EditCar'
import CreateCar from './pages/CreateCar/CreateCar'
import CarDetails from './pages/CarDetails/CarDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
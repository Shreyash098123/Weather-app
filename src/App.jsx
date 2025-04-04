import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import WeatherApp from './Weatherapp.'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WeatherApp/>
    </>
  )
}

export default App

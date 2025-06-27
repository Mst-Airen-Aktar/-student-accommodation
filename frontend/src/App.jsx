import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
    <Navbar/>
    {
      isLoggedIn? <SignUp/> : <LoginPage  />
    }
    </>
  )
}

export default App

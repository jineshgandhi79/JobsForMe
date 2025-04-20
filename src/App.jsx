import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import Loader  from "./Components/Loader"
import UserProvider from './Contexts/UserContext'

const NavBar = lazy(() => import('./Components/NavBar'))
const Home = lazy(() => import('./Components/Home'))
const Jobs = lazy(() => import('./Components/Jobs'))
const Profile = lazy(() => import('./Components/Profile'))

function App() {
  
  return (
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

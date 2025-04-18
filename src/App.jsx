import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'

const NavBar = lazy(() => import('./Components/NavBar'))
const Home = lazy(() => import('./Components/Home'))
const Jobs = lazy(() => import('./Components/Jobs'))
const Profile = lazy(() => import('./Components/Profile'))

function App() {
  
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

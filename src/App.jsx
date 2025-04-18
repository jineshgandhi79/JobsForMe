import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import { lazy } from 'react'
const Jobs = lazy(()=>import('./Components/Jobs'))
const Profile = lazy(()=>import('./Components/Profile'))

function App() {

  return (
    <>
     <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

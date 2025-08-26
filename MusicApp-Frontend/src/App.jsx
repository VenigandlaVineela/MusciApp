import './App.css'
import { Routes, Route } from 'react-router-dom'

import MusicTypes from './componenets/MusicTypes'
import Home from './componenets/Home'
import MusicPlayList from './componenets/MusicPlayList'

import Dashboard from './componenets/Dashboard'
import DashboardMusicPlayList from './componenets/DashboardMusicPlayList'
import DashboardMusicTypes from './componenets/DashboardMusicTypes'
import Privateroute from './componenets/PrivateRoute'




function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/musictypes' element={<MusicTypes />}></Route>
        <Route path='/musicplaylist/:type' element={<MusicPlayList />}>
        </Route>


        <Route element={<Privateroute />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/dashboard/musictypes' element={<DashboardMusicTypes />}></Route>
          <Route path='/dashboard/musicplaylist/:type' element={<DashboardMusicPlayList />}></Route>

        </Route>
      </Routes>




      {/* <Navbar/>
       <Slides/>
       <Categories/>
       <Gallery/> 
       <About/>
       <Languages/>
       <Subscribe/>
       <Footer/> */}

      {/* <MusicTypes/> */}



    </>
  )
}

export default App

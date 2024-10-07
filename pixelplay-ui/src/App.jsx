import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login, Signup, Netflix, Player, Movies, TvShows, UserLiked } from './pages';
import { NotAvailable } from './components';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/player' element={<Player />} />
        <Route exact path='/movies' element={<Movies />} />
        <Route exact path='/mylist' element={<UserLiked />} />
        <Route exact path='/tv' element={<TvShows />} />
        <Route exact path='/' element={<Netflix />} />
        <Route exact path='*' element={<NotAvailable />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App

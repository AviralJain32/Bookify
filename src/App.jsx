import React from 'react'
import Register from "./pages/Register"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import MyNavbar from './components/Navbar'
import ListingPage from './pages/ListingPage'
import Homepage from './pages/Homepage'
import DetailsPage from './pages/DetailsPage'
import ViewOrder from './pages/ViewOrder'
import ViewOrderDetail from './pages/ViewOrderDetail'
const App = () => {
  return (
    <div>
      <MyNavbar/>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/book/list' element={<ListingPage/>} />
      <Route path='/book/view/:bookID' element={<DetailsPage/>} />
      <Route path='/book/orders' element={<ViewOrder/>} />
      <Route path='/book/orders/:bookId' element={<ViewOrderDetail/>} />
      
    </Routes>
    </div>
  )
}

export default App

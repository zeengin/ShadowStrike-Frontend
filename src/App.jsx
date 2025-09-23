import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Entertainment from './pages/Entertainment';
import Technology from './pages/Technology';
import OurServices from './components/home/OurServices';
import ContactPage from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Purchase from './pages/Purchase';
import History from './pages/History';
import { useEffect } from 'react';
import axios from 'axios';
import { apis } from './apis';
import Profile from './pages/Profile';
import ScrollToTop from './components/common/ScrollToTop';
import Terms from './pages/Terms';
import Checkout from './pages/Checkout';



function App() {
  return (
     <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History />} />
          <Route path="/terms&conditions" element={<Terms />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}

export default App

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



function App() {

  return (
     <Router>
      <Header />
      
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}

export default App

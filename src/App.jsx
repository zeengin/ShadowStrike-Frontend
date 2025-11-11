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
import Receipt from './pages/Receipt';
import PlayerDashboard from './pages/PlayerDashboard';
import DepositForm from './pages/DepositForm';
import WithdrawalForm from './pages/WithdrawalForm';
import { useUser } from './context/UserContext';
import Layout from './components/brand/Layout';
import BrandDashboard from './pages/BrandDashboard';
import BrandDeposits from './pages/BrandDeposits';
import KycVerification from './pages/KycVerification';
import BrandWithdrawals from './pages/BrandWithdrawals';



function App() {
  const { user } = useUser();

  return (
    <Router>
      <ScrollToTop />
      {(user?.role_id == 3 || !user) &&
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<PlayerDashboard />} />
              <Route path="/:slug/deposits" element={<DepositForm />} />
              <Route path="/:slug/withdrawals" element={<WithdrawalForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/kyc-verification" element={<KycVerification />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/services" element={<OurServices />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/receipt/:transactionId" element={<Receipt />} />
              <Route path="/terms&conditions" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </>}

      {/* BRAND ROUTES */}
      {user?.role_id === 2 && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<BrandDashboard />} />
            <Route path="/brand/deposit" element={<BrandDeposits />} />
             <Route path="/brand/withdrawal" element={<BrandWithdrawals />} />
            {/*<Route path="/brand/settings" element={<BrandSettings />} /> */}
          </Route>
        </Routes>
      )}
    </Router>
  )
}

export default App

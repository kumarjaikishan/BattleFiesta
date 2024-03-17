import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Preloader from './preloader';
import Dashboard from './pages/dashboard/Dashboard';
import Footbar from './components/footer/footbar';
import Profile from './pages/profile/profile';
import Home from './pages/Home/home';
import { useEffect } from 'react';
import Login from './pages/login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { Errorpage } from './pages/Error/Errorpage';
import Logout from './pages/login/logout'
import Tournasetting from './pages/SettingPage/tournasetting';
import Register from './pages/RegistrationPage/Register';
import Stats from './pages/stats/Stats';
import Tournamentstatpage from './pages/findtournament/tournamentstat/tournamentstatpage';
import Findtournament from './pages/findtournament/findtournament';
import Contact from './pages/contact/contact';
import Faq from './pages/faq/faq';
import AboutUs from './pages/aboutus/aboutus';
import PrivacyPolicy from './pages/privacy/privacy';
import TermsAndConditions from './pages/terms/terms';
import RefundAndCancellationPolicy from './pages/refund/refund';
import Payment from './pages/payment/payment';
import Adminnavbar from './pages/admin/adminnavbar';
import { memshipentry,contactusform,voucher,membership,Users } from './store/admin';

function App() {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);

  useEffect(() => {
    // console.log(import.meta.env.VITE_API_ADDRESS);
  }, [])
  useEffect(() => {
    
  }, [log.isadmin])


  return (
    <>
      <ToastContainer closeOnClick={true} pauseOnFocusLoss={true} />
      <div className="App" >
        <Navbar />
        <div className={log.loader ? 'main loader' : 'main'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setting" element={<Tournasetting />} />
            <Route path="/tournaments"  >
              <Route index element={<Findtournament />} />
              <Route path=":tid" element={<Tournamentstatpage />} />
            </Route>
            <Route path="/admin" element={<Adminnavbar />} />
            {/* <Route path="/admin" >
              <Route index element={<Admindashboard />} />
              <Route path="members" element={<Membershiprequest />} />
            </Route> */}
            <Route path="/register/:registerId" element={<Register />} />
            <Route path="/stat/:tid" element={<Stats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan" element={<Payment />} />
            <Route path="/refund" element={<RefundAndCancellationPolicy />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          {log.loader && <Preloader />}
        </div>
        <Footbar />
      </div>
    </>
  );
}

export default App;

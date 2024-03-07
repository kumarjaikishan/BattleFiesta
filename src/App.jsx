import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Preloader from './preloader';
import Dashboard from './pages/dashboard/Dashboard1';
import Footbar from './components/footer/footbar';
import Profile from './pages/profile/profile';
import Home from './pages/Home/home';
import { useEffect } from 'react';
import Login from './pages/login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../src/store/login';
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
import { memshipentry,contactusform,voucher,membership } from './store/admin';
// import Membershiprequest from './pages/admin/membershiprequest/membershiprequest';

function App() {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // token && dispatch(userdata());
  }, [])
  useEffect(() => {
    log.isadmin && dispatch(memshipentry());
    log.isadmin && dispatch(contactusform());
    log.isadmin && dispatch(voucher());
    log.isadmin && dispatch(membership());
  }, [log.isadmin])


  // autocolse sidebar when screensize below 600px
  const sidebarclose = () => {
    const width = window.innerWidth;
    // console.log(width)
    width < 600 ? dispatch(setnarrow(true)) : null;
  }


  return (
    <>
      <ToastContainer closeOnClick={true} pauseOnFocusLoss={true} />
      <div className="App" >
        <Navbar />
        <div className={log.loader ? 'main loader' : 'main'} onClick={sidebarclose}>
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

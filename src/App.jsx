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
import Membershiprequest from './pages/admin/membershiprequest/membershiprequest';
import Admindashboard from './pages/admin/dashboard/dashboard';
import Query from './pages/admin/query/query';
import Voucher from './pages/admin/voucher/voucher';
import Membership from './pages/admin/membership/membership';
import User from './pages/admin/user/user';
import PasswordReset from './pages/password/password';
import Tdmsetting from './pages/tdm/main';
import TdmRegister from './pages/TdmRegistrationPage/TdmRegister';
import { messaging } from './firebase';
import { toast } from 'react-toastify';
import { getToken, onMessage } from 'firebase/messaging'

function App() {
  const log = useSelector((state) => state.login);
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission == 'granted') {
      const notificationtoken = await getToken(messaging, { vapidKey: 'BBUxuDLlWdfTvuiQ3UFyT6BdxGpM95ua-Y9MKaeTo8guV81sXFVhhrS1CeGFkdIVtt8JCGpUZVKElwdmGSvJAkA' });
      console.log(notificationtoken);
      try {
        const token = localStorage.getItem("token");
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}notificationToken`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationtoken })
        });
        const data = await responsee.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else if (permission == 'denied') {
      toast.warn('Allow Notification to get Updates')
    }
  }
  useEffect(() => {
    onMessage(messaging, (payload) => {
      // toast.success(payload.notification.title, { autoClose: 2100 })
      toast.success(payload.notification.body, { autoClose: false })
    })
  }, [])
  useEffect(() => {
    log.islogin && requestPermission();

    const date = new Date();
    const milliseconds = date.getTime();

    // console.log(milliseconds);
  }, [log.islogin])


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
            <Route path="/tdmsetting/:tid" element={<Tdmsetting />} />
            <Route path="/tournaments"  >
              <Route index element={<Findtournament />} />
              <Route path=":tid" element={<Tournamentstatpage />} />
            </Route>
            <Route exact path='/admin' element={<Adminnavbar />}>
              <Route index element={<Admindashboard />} />
              <Route path='membershiprequest' element={<Membershiprequest />} />
              <Route path='query' element={<Query />} />
              <Route path='voucher' element={<Voucher />} />
              <Route path='membership' element={<Membership />} />
              <Route path='users' element={<User />} />
            </Route>
            <Route path="/register/:registerId" element={<Register />} />
            <Route path="/tdmregister/:registerId" element={<TdmRegister />} />
            <Route path="/stat/:tid" element={<Stats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/resetpassword/:token" element={<PasswordReset />} />
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
      </div >
    </>
  );
}

export default App;

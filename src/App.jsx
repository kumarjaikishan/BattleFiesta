import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Preloader from './preloader';
import './pages/findtournament/findtournas.css'
import Dashboard from './pages/dashboard/Dashboard';
import Footbar from './components/footer/footbar';
import Home from './pages/Home/home';
import { useEffect, lazy, Suspense } from 'react';
import Login from './pages/login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Errorpage } from './pages/Error/Errorpage';
import Logout from './pages/login/logout';
import Tournasetting from './pages/SettingPage/tournasetting';
import Register from './pages/RegistrationPage/Register';
import Tournamentstatpage from './pages/findtournament/tournamentstat/tournamentstatpage';
import Contact from './pages/contact/contact';
import Faq from './pages/faq/faq';
import AboutUs from './pages/aboutus/aboutus';
import PrivacyPolicy from './pages/privacy/privacy';
import TermsAndConditions from './pages/terms/terms';
import RefundAndCancellationPolicy from './pages/refund/refund';
import Payment from './pages/payment/payment';
import PasswordReset from './pages/password/password';
import Tdmsetting from './pages/tdm/main';
import TdmRegister from './pages/TdmRegistrationPage/TdmRegister';
import Stats from './pages/stats/Stats';
import { messaging } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';
import Modalbox from './components/custommodal/Modalbox';
import AdminRoutes from './utils/AdminRoutes';
import UserRoute from './utils/UserRoute';
import Channeldashboard from './pages/userDashboard/channeldashboard';

// Lazy loaded components
const Profile = lazy(() => import('./pages/profile/profile'));
const Findtournament = lazy(() => import('./pages/findtournament/findtournament'));
const Admindashboard = lazy(() => import('./pages/admin/dashboard/dashboard'));
const Membershiprequest = lazy(() => import('./pages/admin/Request/Request'));
const Query = lazy(() => import('./pages/admin/query/query'));
const Voucher = lazy(() => import('./pages/admin/voucher/voucher'));
const Membership = lazy(() => import('./pages/admin/membership/membership'));
const User = lazy(() => import('./pages/admin/user/user'));
// const Stats = lazy(() => import('./pages/stats/Stats'));

function App() {
  const log = useSelector((state) => state.login);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const notificationtoken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_HERE' });
      console.log(notificationtoken);
      try {
        const token = localStorage.getItem('token');
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}notificationToken`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationtoken }),
        });
        const data = await responsee.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else if (permission === 'denied') {
      toast.warn('Allow Notification to get Updates');
    }
  }

  useEffect(() => {
    onMessage(messaging, (payload) => {
      toast.success(payload.notification.body, { autoClose: false });
    });
  }, []);

  useEffect(() => {
    log.islogin && requestPermission();
  }, [log.islogin]);

  return (
    <>
      {/* //pauseOnFocusLoss for toast */}
      <ToastContainer closeOnClick />
      <div className="App">
        <Navbar />
        <div className={log.loader ? 'main loader' : 'main'}>
          <Routes>
            <Route element={<UserRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Preloader />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route path="/setting/:tid" element={<Tournasetting />} />
              <Route path="/tdmsetting/:tid" element={<Tdmsetting />} />
            </Route>

            {/* Suspense Wrapper around Admin Routes */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<Preloader />}>
                  <AdminRoutes />
                </Suspense>
              }
            >
              <Route path="" element={<Admindashboard />} />
              <Route path="request" element={<Membershiprequest />} />
              <Route path="query" element={<Query />} />
              <Route path="voucher" element={<Voucher />} />
              <Route path="membership" element={<Membership />} />
              <Route path="users" element={<User />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/tournaments">
              <Route
                index
                element={
                  <Suspense fallback={<Preloader />}>
                    <Findtournament />
                  </Suspense>
                }
              />
              <Route path=":tid" element={<Tournamentstatpage />} />
            </Route>
            <Route path="/stat/:tid" element={<Stats />} />
            <Route path="/channel/:uid" element={<Channeldashboard />} />
            <Route path="/register/:registerId" element={<Register />} />
            <Route path="/tdmregister/:registerId" element={<TdmRegister />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/resetpassword/:token" element={<PasswordReset />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan" element={<Payment />} />
            <Route path="/refund" element={<RefundAndCancellationPolicy />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/modal" element={<Modalbox />} />

            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Errorpage />} />

            {log.islogin ? (
              <Route path="/login" element={<Navigate to="/dashboard" />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
          </Routes>
          {log.loader && <Preloader />}
        </div>
        <Footbar />
      </div>
    </>
  );
}

export default App;

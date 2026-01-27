import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Preloader from './preloader';
import Dashboard from './pages/dashboard/Dashboard';
import Footbar from './components/footer/footbar';
import Home from './pages/Home/home';
import { useEffect, lazy, Suspense } from 'react';
import Login from './pages/login/login';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { Errorpage } from './pages/Error/Errorpage';
import Logout from './pages/login/logout';
import Contact from './pages/contact/contact';
import Faq from './pages/faq/faq';
import AboutUs from './pages/aboutus/aboutus';
import PrivacyPolicy from './pages/privacy/privacy';
import TermsAndConditions from './pages/terms/terms';
import RefundAndCancellationPolicy from './pages/refund/refund';
import PasswordReset from './pages/password/password';
import { toast } from 'react-toastify';
import AdminRoutes from './utils/AdminRoutes';
import UserRoute from './utils/UserRoute';
import { Helmet } from "react-helmet-async";
import { profilefetch } from './store/profile';

// off this for disable notification
import { messaging } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';
import LoginSuccess from './pages/login/LoginSucess';

// Lazy loaded components
const Profile = lazy(() => import('./pages/profile/profile'));
const Findtournament = lazy(() => import('./pages/findtournament/findtournament'));
const AllFindtournament = lazy(() => import('./pages/findtournament/allFindtournament'));
const BackupSchedulePage = lazy(() => import('./pages/admin/backups/Backups'));
const Membershiprequest = lazy(() => import('./pages/admin/Request/Request'));
const Query = lazy(() => import('./pages/admin/query/query'));
const Voucher = lazy(() => import('./pages/admin/voucher/voucher'));
const Membership = lazy(() => import('./pages/admin/membership/membership'));
const User = lazy(() => import('./pages/admin/user/user'));
const Register = lazy(() => import('./pages/RegistrationPage/Register'));
const TdmRegister = lazy(() => import('./pages/TdmRegistrationPage/TdmRegister'));
const Tournasetting = lazy(() => import('./pages/SettingPage/tournasetting'));
const Tdmsetting = lazy(() => import('./pages/tdm/main'));
const Stats = lazy(() => import('./pages/stats/Stats'));
const Tournamentstatpage = lazy(() => import('./pages/findtournament/tournamentstat/tournamentstatpage'));
const Channeldashboard = lazy(() => import('./pages/userDashboard/channeldashboard'));
const Subscription = lazy(() => import('./pages/Subscription/subscription'));


function App() {
  const log = useSelector((state) => state.login);
  let navigate = useNavigate();
  const dispatch = useDispatch();

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
    const unsubscribe = onMessage(messaging, (payload) => {
      toast.success(payload.notification?.body, { autoClose: false });
    });

    return unsubscribe;
  }, []);


  const baseURL = `${window.location.origin}`;
  const targetBaseURL = 'https://battlefiesta.in';

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost' || /^192\./.test(window.location.hostname);

    if (!isLocalhost && baseURL !== targetBaseURL) {
      window.location.href = `${targetBaseURL}${window.location.pathname}`;
    } else {
      console.log("URL is correct or running on localhost, no redirection needed");
    }

    // off this for disable notification
    // log.islogin && requestPermission();
    // console.log("is admin: ", log.isadmin)
    log.islogin && jwtcheck();
    log.islogin && dispatch(profilefetch());
  }, [log.islogin]);

  const jwtcheck = async () => {
    try {
      const token = localStorage.getItem('token');
      const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}jwtcheck`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(responsee)
      const data = await responsee.json();
      console.log("jwt check", data);

      if (data.message === 'jwt expired') {
        swal({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
          button: {
            text: 'OK',
          },
        }).then(() => {
          return navigate('/logout');
        });
      }
      if (data.message === 'Invalid Token') {
        swal({
          title: 'Invalid Token',
          text: 'You need to log in again.',
          icon: 'warning',
          button: {
            text: 'OK',
          },
        }).then(() => {
          return navigate('/logout');
        });
      }
    } catch (error) {
      console.log("catch part", error);
    }
  }

  return (
    <>
      <div className="App">
        <Helmet>
          <title>BattleFiesta - Esports Tournament Management Service</title>
          {/* <meta name="robots" content="noindex, nofollow" /> */}
          <link rel="canonical" href={`${window.location.origin}`} />
          <meta name="description"
            content="BattleFiesta is India's best platform for PUBG, BGMI, and Free Fire tournaments organiser. Create & manage real-time esports
                           events with an advanced points table maker, automated rankings." />
        </Helmet>

        <Navbar />

        <div className={log.loader ? 'main loader' : 'main'}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route element={<UserRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/profile"
                  element={
                    <Profile />
                  }
                />
                <Route path="/setting/:tid" element={<Tournasetting />} />
                <Route path="/tdmsetting/:tid" element={<Tdmsetting />} />
              </Route>

              {log.isadmin && (
                <Route
                  path="/admin"
                  element={
                    <AdminRoutes />
                  }
                >
                  <Route path="" element={<BackupSchedulePage />} />
                  <Route path="request" element={<Membershiprequest />} />
                  <Route path="query" element={<Query />} />
                  <Route path="voucher" element={<Voucher />} />
                  <Route path="membership" element={<Membership />} />
                  <Route path="users" element={<User />} />
                </Route>
              )}
              <Route
                path="/admin/*"
                element={<Navigate to="/dashboard" replace />}
              />
              <Route path="/admintournaments"
                element={<AdminRoutes> <AllFindtournament /> </AdminRoutes>}
              />


              <Route path="/" element={<Home />} />
              <Route path="/tournaments">
                <Route index element={<Findtournament />} />
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
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/refund" element={<RefundAndCancellationPolicy />} />
              <Route path="/faq" element={<Faq />} />

              <Route path="/login/success" element={<LoginSuccess />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Errorpage />} />

              {log.islogin ? (
                <Route path="/login" element={<Navigate to="/dashboard" />} />
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </Suspense>
          {log.loader && <Preloader />}
        </div>
        <Footbar />
      </div>
    </>
  );
}

export default App;

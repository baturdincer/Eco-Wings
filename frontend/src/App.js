import "./App.css";
import Navbar from "./menu-bar/Navbar";
import Login from "./login-page/login";
import Signup from "./signup-page/signup";
import ResetPassword from "./reset-password-page/resetpassword";
import Home from "./home-page/home";
import FlightList from "./components/FlightList";
import BagajInfo from "./information-page/bagajinfo";
import PassengerInfo from "./information-page/passengerinfo";
import Rate from "./rate-page/rate";
import Campaigns from "./campaigns-page/campaigns";
import AddFlight from "./components/AddFlight";
import EditFlight from "./components/EditFlight";
import ProfileSettings from "./profileSettings-page/profilesettings";
import TicketWScore from "./ticketwscore-page/ticketwscore";
import GiftTicket from "./giftTicket-page/giftticket";
import FlightTracking from "./flightTracking-page/flighttracking";
import LuckyFlight from "./luckyFlight-page/luckyflight";
import GeneralInfo from "./information-page/generalinfo";
import AdminFlights from "./admin-panel/adminflights";
import AdminKampanya from "./admin-panel/adminkampanya";
import AdminAirport from "./admin-panel/adminairport";
import AdminTicket from "./admin-panel/adminticket";
import AdminAirline from "./admin-panel/adminairline";
import AdminUser from "./admin-panel/adminuser";
import AdminProduct from "./admin-panel/adminproduct";
import AdminHome from "./admin-panel/admin-homepage/adminhome";
import TemsilciHome from "./admin-panel/temsilcihome";
import PaymentTest from "./components/PaymentTest";
import { AuthProvider } from "./context/AuthContext";
import FlightResults from "./pages/FlightResults";
import PaymentPage from "./payment-page/PaymentPage";
import PaymentSuccess from "./payment-page/PaymentSuccess";
import PaymentFail from "./payment-page/PaymentFail";
import HediyeSayfasi from "./giftTicket-page/HediyeSayfasi";

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [flights, setFlights] = useState([]);

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/hediye-sayfasi" element={<HediyeSayfasi />} />
            <Route path="/payment-fail" element={<PaymentFail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-page" element={<PaymentPage />} />
            <Route path="/flight-results" element={<FlightResults />} />{" "}
            {/* ✅ yeni route */}
            <Route path="/lucky-flight" element={<LuckyFlight />} />
            <Route path="/temsilci" element={<TemsilciHome />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin-product" element={<AdminProduct />} />
            <Route path="/admin-user" element={<AdminUser />} />
            <Route path="/admin-campaigns" element={<AdminKampanya />} />
            <Route path="/admin-flights" element={<AdminFlights />} />
            <Route path="/admin-airport" element={<AdminAirport />} />
            <Route path="/admin-ticket" element={<AdminTicket />} />
            <Route path="/admin-airline" element={<AdminAirline />} />
            <Route path="/general-info" element={<GeneralInfo />} />
            <Route path="/lucky-flight" element={<LuckyFlight />} />
            <Route path="/flight-tracking" element={<FlightTracking />} />
            <Route path="/gift-ticket" element={<GiftTicket />} />
            <Route path="/ticketwings-score" element={<TicketWScore />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/comments-rating" element={<Rate />} />
            <Route path="/baggage-info" element={<BagajInfo />} />
            <Route path="/passenger-info" element={<PassengerInfo />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Home />} exact />
            <Route
              path="/flights"
              element={<FlightList flights={flights} setFlights={setFlights} />}
            />
            <Route
              path="/add-flight"
              element={<AddFlight flights={flights} setFlights={setFlights} />}
            />
            <Route
              path="/edit-flight/:id"
              element={<EditFlight flights={flights} setFlights={setFlights} />}
            />
            <Route path="/payment-test" element={<PaymentTest />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

//  path="/" exact

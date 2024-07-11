import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './components/pages/landingPages/LandingPage';
import Login from './components/pages/auth/Login/Login';
import Register from './components/pages/auth/Register/Register';
import Customer from './Custormer/Customer';
//import Logout from './Custormer/component/pages/Logout/Logout';
import Profile from './Custormer/component/pages/profile/Profile';
import PositionCommodity from './Custormer/component/pages/position/positionCommodity/PositionCommodity';
import PositionEquity from './Custormer/component/pages/position/positionEquity/PositionEquity';
import PositionFandO from './Custormer/component/pages/position/positionF&O/PositionF&O';
import HoldingCommodity from './Custormer/component/pages/Holding/holdingCommodity/HoldingCommodity';
import HoldingEquity from './Custormer/component/pages/Holding/holdingEquity/HoldingEquity';
import HoldingFandO from './Custormer/component/pages/Holding/holdingF&O/HoldingF&O';
import DashboardHome from './Custormer/component/pages/dashboard/DashboardHome';
import Deposit from './Custormer/component/pages/deposit/Deposit';
import Addfund from './Custormer/component/pages/Addfund/Addfund';
import TradeReport from './Custormer/component/pages/tradeReport/TradeReport';
import ChangePassword from './Custormer/component/pages/changePassword/ChangePassword';
import WithdrawRequest from './Custormer/component/pages/withdrawRequest/WthdrawRequest';
import { AuthContext } from './contextApi/AuthContext';
import AdminLogin from "./components/Admin/Ad_login";
import AdminSign from "./components/Admin/Ad_signup";
import Adminforget from "./components/Admin/Ad_forgetPassword";
import AdminReset from "./components/Admin/Ad_resetPassword";
import AdminChangePassword from "./components/Admin/Ad_changePassword";
import AdminHome from "./components/Admin/Ad_home";
import HoldingEquityAd from './components/Admin/holding/HoldingEquityAd';
import PositionEquityAd from './components/Admin/position/PositionEquityAd';
import HoldingFandOAd from './components/Admin/holding/HoldingFandOAd';
import HoldingCommodityAd from './components/Admin/holding/HoldingCommodityAd';
import PositionFandOAd from './components/Admin/position/PositionFandOAd';
import PositionCommodityAd from './components/Admin/position/PositionCommodityAd';
import AdProfile from './components/Admin/Ad_profile';
import AdminAddfund from './components/Admin/AdminaddFund';
import AdminDeposit from './components/Admin/Ad_deposit';
import AdminPage from './Adminpage';
import GetUserDetails from './components/Admin/GetUserProfile';
import Adwithdraw from './components/Admin/AdminNotification';
import ForgetPassword from './components/pages/auth/Login/ForgetPassword';
import ResetPassword from './components/pages/auth/Login/ResetPassword';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (storedRole) {
      setRole(storedRole);
    }

  }, [isAuthenticated]);

  return (

    <BrowserRouter>
      <Routes>
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<LandingPage />} />
          <Route path="/ad_login" element={<AdminLogin />} />
          <Route path="/ad_sign" element={<AdminSign />} />
          <Route path="/ad_forgetpassword" element={<Adminforget />} />
          <Route path="/ad_resetpassword/:token" element={<AdminReset />} />
          <Route path="/account" element={<AdminPage/>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}/>
          <Route path="/resetpassword/:token" element={<ResetPassword/>}/>

        </>
        {
          isAuthenticated && role === "user" && (
            <>
              <Route path="/dashboard" element={<Customer />} />
              <Route path="/withdrawRequest" element={<WithdrawRequest />} />
              <Route path="/dashboardhome" element={<DashboardHome />} />
              <Route path="/positioncommodity" element={<PositionCommodity />} />
              <Route path="/positionequity" element={<PositionEquity />} />
              <Route path="/positionfando" element={<PositionFandO />} />
              <Route path="/holdingcommodity" element={<HoldingCommodity />} />
              <Route path="/holdingequity" element={<HoldingEquity />} />
              <Route path="/holdingfando" element={<HoldingFandO />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/addfund" element={<Addfund />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tradeReport" element={<TradeReport />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </>
          )}

        {/* agr admin ne login kra to */}
        {
          isAuthenticated && role === "admin" && (
            <>          
              <Route path="/ad_changepassword" element={<AdminChangePassword />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/adpositionequity" element={<PositionEquityAd />} />
              <Route path="/adholdingequity" element={<HoldingEquityAd />} />
              <Route path="/adpositioncommodity" element={<PositionCommodityAd />} />
              <Route path="/adpositionfando" element={<PositionFandOAd />} />
              <Route path="/adholdingcommodity" element={<HoldingCommodityAd />} />
              <Route path="/adholdingfando" element={<HoldingFandOAd />} />
              <Route path="/adprofile" element={<AdProfile />} />
              <Route path="/adaddfund" element={<AdminAddfund />} />
              <Route path="/addeposit" element={<AdminDeposit />} />
              <Route path="/getuserdetails" element={<GetUserDetails />}/>
              <Route path="/adwithdraw" element={<Adwithdraw/>}/>
            </>
          )
        }


      </Routes>

    </BrowserRouter>

  )

}

export default App;

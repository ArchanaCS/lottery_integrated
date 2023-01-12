import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

import Topbar from "./components/Topbar";
import Sucess from "./pages/Sucess";
import Failure from "./pages/Failure";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/Userdetails";
import Checkout from "./pages/Checkout";
import Userprofile from "./pages/Userprofile";
import TicketSelector from "./pages/TicketSelector";
import AdminUnitlist from "./pages/AdminUnitlist";
import AdminLotteryManager from "./pages/AdminLotteryManager";
import AdminDashboard from "./pages/AdminDashboard"
import LotteryManager from "./pages/LotteryManager";
import Test from "./Test";
import AddLott from "./components/AddLott";
export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Verifyotp" element={<VerifyOTP />}></Route>
        <Route path="/Topbar" element={<Topbar />}></Route>
        <Route path="/Sucess" element={<Sucess />}></Route>
        <Route path="/Failure" element={<Failure />}></Route>
        <Route path="/UserPage" element={<UserPage />}></Route>
        <Route path="/Checkout" element={<Checkout />}></Route>
        <Route path="/TicketSelector" element={<TicketSelector />}></Route>
        <Route path="/Userprofile" element={<Userprofile />}></Route>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
        <Route path="/AdminUnit" element={<AdminUnitlist/>}></Route>
        <Route path="/AdminLotteryManager" element={<AdminLotteryManager/>}></Route>
        <Route path="/LotteryManager" element={<LotteryManager/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

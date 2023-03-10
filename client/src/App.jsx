import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { Error404Page } from "./pages/Error404Page/Error404Page";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Home } from "./pages/Home/Home";
import { CreateListing } from "./pages/CreateListing/CreateListing";
import { ViewListing } from "./pages/ViewListing/ViewListing";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/new-password" element={<NewPassword />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/create-listing" element={<CreateListing />}></Route>
            <Route path="/view-listing" element={<ViewListing />}></Route>
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
}

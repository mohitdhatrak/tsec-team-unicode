import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Error404Page } from "./pages/Error404Page/Error404Page";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
}

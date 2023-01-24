import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/index.scss";
import Login from "./pages/auth/login";
import Protected from "./Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </Protected>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

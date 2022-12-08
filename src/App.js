import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

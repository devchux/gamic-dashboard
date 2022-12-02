import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard";

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
    </BrowserRouter>
  );
}

export default App;

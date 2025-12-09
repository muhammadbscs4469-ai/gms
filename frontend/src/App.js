import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/ReUseable/Sidebar/Sidebar";
import HomePage from "./components/HomePage";
import LogisticPage from "./components/logistic/LogisticPage";
import ShipmentTracker from "./components/logistic/Shipment Tracker/shipmentTracker";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "190px", flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logistic" element={<LogisticPage />} />
            <Route path="/dashboard/logistic/shipment-tracker" element={<ShipmentTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
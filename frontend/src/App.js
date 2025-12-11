import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/ReUseable/Sidebar/Sidebar";
import HomePage from "./components/HomePage";
import LogisticPage from "./components/logistic/LogisticPage";
import DispatchPage from "./components/Dispatch/DispatchPage";
import ShipmentTracker from "./components/logistic/Shipment Tracker/shipmentTracker";
import DispatchManager from "./components/Dispatch/Dispatch_Manager/dispatchmanager"
//import DispatchManager from "./components/logistic/DispatchManager";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "190px", flex: 1, height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logistic" element={<LogisticPage />} />
            <Route path="/dispatch" element={<DispatchPage />} />

            <Route path="/dashboard/logistic/shipment-tracker" element={<ShipmentTracker />} />
            <Route path="/dashboard/dispatch/dispatch-management" element={<DispatchManager/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
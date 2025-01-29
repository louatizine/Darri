import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Import the Login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add other routes like /dashboard here */}
      </Routes>
    </Router>
  );
}

export default App;

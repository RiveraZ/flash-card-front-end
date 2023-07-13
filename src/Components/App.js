import { useCallback, useEffect, useState } from "react";
import "../styles/App.css";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  return (
    <div className="App">
      <div className="headerContainer">
        <div className="header">
          <h1>FlashCard</h1>
        </div>
      </div>
      {authenticatedUser ? <Dashboard /> : <LandingPage />}
    </div>
  );
};

export default App;

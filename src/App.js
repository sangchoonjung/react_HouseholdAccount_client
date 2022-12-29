import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Join from "./components/join";
import { useEffect, useState } from "react";
import AccountAPI from "./service/accountAPI";
import Write from "./components/write";
import History from "./components/history";
import HistoryAPI from "./service/historyAPI";
import Search from "./components/search";
import PrivateRoute from "./lib/privateRoute";

const accountAPI = new AccountAPI(process.env.REACT_APP_SERVERIP);
const historyAPI = new HistoryAPI(process.env.REACT_APP_SERVERIP);

function App() {
  document.title = "가계부";
  const [logon, setLogon] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      accountAPI.valid(localStorage.getItem("token")).then((received) => {
        console.log(received);
        if (received.result) {
          //개선요망
          setLogon(received.owner);
        } else {
          setLogon(null);
        }
      });
    }
  }, [logon]);

  return (
    <div className="container">
      <BrowserRouter basename="https://sangchoonjung.github.io/react_HouseholdAccount_client">
        <Header logon={logon} setLogon={setLogon} />
        <Routes>
          <Route index element={<PrivateRoute><History historyAPI={historyAPI} /></PrivateRoute>} />
          <Route
            path="login"
            element={<Login accountAPI={accountAPI} setLogon={setLogon} />}
          />
          <Route path="join" element={<Join accountAPI={accountAPI} />} />
          <Route path="write" element={<PrivateRoute><Write historyAPI={historyAPI} /></PrivateRoute>} />
          <Route
            path="search"
            element={<PrivateRoute><Search historyAPI={historyAPI} logon={logon} /></PrivateRoute>}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

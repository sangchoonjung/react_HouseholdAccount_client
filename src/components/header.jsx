import { Link } from "react-router-dom";
import React, { useState } from "react";

function Header(props) {
  const { logon, setLogon } = props;

  const logoutHandle = () => {
    localStorage.removeItem("token");
    setLogon(null);
  };

  const LoginedId = () => {
    if (logon) {
      return (
        <li className="nav-item">
          <Link to="/mypage" className="nav-link">
            {logon}
          </Link>
        </li>
      );
    } else {
      <></>;
    }
  };

  return (
    <div className="mt-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              home
            </Link>
          </li>
          {!logon ? (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={logoutHandle}>
                logout
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/write" className="nav-link">
              Write
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
          <LoginedId />
        </ul>
      </div>
    </div>
  );
}

export default Header;

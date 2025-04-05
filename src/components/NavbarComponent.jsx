import React, { useState } from "react";
import logo from "../assets/images/logo.png";

function NavbarComponent({ onSearch, onReset }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleResetClick = () => {
    setSearchText("");
    onReset();
  };

  return (
    <div className="navbarComponent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" className="navbarComponent__image" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "none",
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              <button
                className="pl-3 btn btn-outline-warning"
                onClick={handleResetClick}
              >
                Reiniciar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;

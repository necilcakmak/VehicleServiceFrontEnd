import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";

const Navbar = ({ isAuthenticated, logout }) => {
  const questLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Giriş
        </Link>
      </li>
    </Fragment>
  );
  const authLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/vehicle">
          Araç
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/vehiclePart">
          Araç Parça
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/customer">
          Müşteri
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/invoice">
          Fatura
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={{ cursor: "pointer" }}
          to="/"
          onClick={logout}
        >
          Çıkış
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
             AnaSayfa
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isAuthenticated ? authLinks() : questLinks()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Navbar);

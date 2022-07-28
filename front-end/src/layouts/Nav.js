import { Link } from "react-router-dom";
import LogoutLink from "../components/LogoutPage";

const Nav = () => {
  return (
    <div className="container">
      <nav className="navbar fixed-top navbar-expand-md navbar-dark" style={{ backgroundColor: '#2E3047' }}>
        <div className="container">
          <a className="navbar-brand text-light" href="/">API APP</a>
          <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav d-flex justify-content-end">
              <Link key={'link-home'} to="/home" className="nav-link text-ligth" aria-current="page">Home</Link>
              <Link key={'link-pokemons'} className="nav-link text-ligth" to="/pokemons">Pokemon Data</Link>
              <Link key={'link-user-data'} className="nav-link text-ligth" to="/user-data">Websocket</Link>
              <LogoutLink />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
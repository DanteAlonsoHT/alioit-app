import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../store/actions/AuthActions";
import { isAuthenticated } from "../store/selectors/AuthSelectors";

const LogoutLink = (props) => {
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(logout(props.history));
  }
  return (
    <>
      <Link key={'link-logout'} className="nav-link text-gray" onClick={onLogout}>Log out</Link>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(LogoutLink));

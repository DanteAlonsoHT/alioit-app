import React, { useState, useCallback, useEffect } from "react";
/// React router dom
import { Switch, Route } from "react-router-dom";
/// Websocket application
import useWebSocket, { ReadyState } from "react-use-websocket";

import { connect, useDispatch } from "react-redux";

/// CSS
import "./App.css";

/// Layouts
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";

/// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

// Actions to use Redux
// import { getReservationsAction } from "../store/actions/ReservationAction";

import { store } from "./store/store";
import Pokemons from "./pages/Pokemons";
import UserData from "./pages/UserData";

const Components = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getReservationsAction(dataUser.userDetails.id, props.history));
  }, [dispatch, props.history]);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");

  const routes = [
    /// App
    { url: "", component: (props) => <Home {...props} /> },
    { url: "home", component: (props) => <Home {...props} /> },
    { url: "pokemons", component: (props) => <Pokemons {...props} /> },
    { url: "user-data", component: (props) => <UserData {...props} /> },

    { url: 'register', component: (props) => <Registration {...props} /> },
    { url: 'login', component: (props) => <Login {...props} /> },
  ];

  return (
    <>
      <div
        id={`${!pagePath ? "main" : ""}`}
        className={`${!pagePath ? "show" : "none"}`}
      >
        {!pagePath && (
          <Nav
            // message={message}
            // handleCheckedMessages={handleCheckedMessages}
          />
        )}
        <div>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((route, key) => (
                <Route
                  key={key}
                  exact
                  path={`/${route.url}`}
                  render={route.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
    </>
  );
};

export default Components;

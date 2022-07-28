import React, { createContext } from "react";

export const ThemeContext = createContext();
const ThemeContextProvider = (props) => {
  const body = document.querySelector("body");
  return (
    <ThemeContext.Provider
      value={{
        body,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

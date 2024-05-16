import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider() {
    
  const root = document.documentElement;

  const { isAuthenticated } = useAuth();

  root.style.setProperty('--color-1', '#000000');
  root.style.setProperty('--color-2', '#333333');
}
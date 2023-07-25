import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Login from "scenes/login";
import Machine from "scenes/machine";
import Transactions from "scenes/transactions";
import ProtectedRoute from "state/ProtectedRoute";
import Resetpasswordpromt from "scenes/resetpassword";
import { AuthContextProvider } from "state/AuthContext";
import Signin from "scenes/signin";

function App() {
  const  mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path="/resetpassword" element={<Resetpasswordpromt />}/>
          <Route element={<Layout />}>
          <Route
            path='/machine'
            element={
              <ProtectedRoute>
                <Machine />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transactions'
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </AuthContextProvider>
    </ThemeProvider>
    </BrowserRouter>
  </div>
}

export default App;

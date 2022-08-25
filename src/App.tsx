import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import CasePage from "./components/CasePage";
import Home from "./components/Home";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Search from "./components/Search";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const {colorMode} = useThemeContext()
  return (
    <MantineProvider theme={{colorScheme: colorMode, fontFamily: 'Poppins, sans serif'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth><Outlet /></Auth>}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="analytics" element={<Home />} />
            <Route path="search">
              <Route index element={<Search />} />
              <Route path=":hash" element={<CasePage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

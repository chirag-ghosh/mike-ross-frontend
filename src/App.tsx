import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CasePage from "./components/CasePage";
import Home from "./components/Home";
import { NavbarMinimal } from "./components/NavbarMinimal";
import Schedule from "./components/Schedule";
import Search from "./components/Search";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const {colorMode} = useThemeContext()
  return (
    <MantineProvider theme={{colorScheme: colorMode, fontFamily: 'Poppins, sans serif'}}>
      <BrowserRouter>
        <div className="layout">
          <NavbarMinimal />
          <div className={`main-area ${colorMode}`}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="search">
                <Route index element={<Search />} />
                <Route path=":hash" element={<CasePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { NavbarMinimal } from "./components/NavbarMinimal";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const {colorMode} = useThemeContext()
  return (
    <MantineProvider theme={{colorScheme: colorMode}}>
      <BrowserRouter>
        <div className="layout">
          <NavbarMinimal />
          <div className={`main-area ${colorMode}`}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

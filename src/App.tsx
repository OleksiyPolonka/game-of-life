import { useState } from "react";
import { ThemeProvider } from "styled-components";

import Grid from "./Grid";
import { theme } from "./constants/theme";
import { AppContainer } from "./style";

import "./App.css";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={theme[darkMode ? "dark" : "light"]}>
      <AppContainer>
        <Header toggled={darkMode} onToggleClick={setDarkMode} />
        <Grid />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

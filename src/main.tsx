import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./app/lib/theme/theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import "./app/lib/i18n/i18n.ts";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

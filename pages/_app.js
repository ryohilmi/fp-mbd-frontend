import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import "../styles/globals.scss";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
    fontSize: 14,
    fontWeightMedium: 700,
  },
  components: {},
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6E1221",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "",
    },
    red: {
      main: "#ff0000",
    },
  },
});

export default theme;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

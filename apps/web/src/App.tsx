import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/Route";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
      <ScrollToTop />

        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

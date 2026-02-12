import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginSignup from "./login/login.jsx"; 
import DivComponents from "./components/divComponents.jsx";
import FreeBooks from "./components/naveBarContents/freeBooks.jsx";
import PaidBookDetail from "./components/PaidBookDetail.jsx";
import PaidBooks from "./components/naveBarContents/paidBooks.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Profile from "./Profile/Profile.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<LoginSignup />} />

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Books */}
        <Route
          path="/book/:title"
          element={
            <ProtectedRoute>
              <DivComponents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/free-books"
          element={
            <ProtectedRoute>
              <FreeBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/paid-book/:title"
          element={
            <ProtectedRoute>
              <PaidBookDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/paid-books"
          element={
            <ProtectedRoute>
              <PaidBooks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;
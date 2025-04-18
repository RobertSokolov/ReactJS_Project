import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from "./layouts/baseLayout.tsx";
import Home from "./pages/Home.tsx";
import BookDetail from "./pages/BookDetails.tsx";
import { AuthProvider, useAuth } from "./Context/authContext.tsx";
import FavoritePage from "./pages/FavoritePage.tsx";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoritePage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AuthProvider>

  </BrowserRouter>,
)
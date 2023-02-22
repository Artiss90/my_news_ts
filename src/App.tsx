import Header from 'components/Header/Header';
import ViewNews from 'components/ViewNews/ViewNews';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import SignIn from './components/SignIn/SignIn';

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/News" element={<ViewNews />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <h1>Profile</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<SignIn />} />
      </Routes>
    </div>
  );
}

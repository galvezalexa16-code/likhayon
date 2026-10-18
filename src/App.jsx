// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Museum from './pages/Museum';
import MaterialsBank from './pages/MaterialsBank';
import BorrowingRequest from './pages/BorrowingRequest';
import RequestTracker from './pages/RequestTracker';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/museum"    element={<Museum />} />
          <Route path="/materials" element={<MaterialsBank />} />
          <Route path="/borrow"    element={<BorrowingRequest />} />
          <Route path="/track"     element={<RequestTracker />} />
          <Route path="/about"     element={<About />} />
          <Route path="/admin"     element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

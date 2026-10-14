import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterPartnerPage from './pages/RegisterPartnerPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfilePage from './pages/ProfilePage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen w-full bg-white font-sans antialiased">
                <Navbar />
                <main className="flex-grow w-full">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/register-partner" element={<RegisterPartnerPage />} />
                        <Route path="/verify-email" element={<VerifyEmailPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/dashboard" element={<OwnerDashboardPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
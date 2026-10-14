import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Безопасное чтение пользователя из localStorage
    let user = null;
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            user = JSON.parse(storedUser);
        }
    } catch (e) {
        console.error('Помилка парсингу користувача:', e);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="border-b bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Логотип */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand">
                    <div className="bg-brand text-white p-1.5 rounded-lg">
                        <MapPin className="w-6 h-6 fill-current text-white" />
                    </div>
                    <span>TASTE MAP</span>
                </Link>

                {/* Навигация */}
                <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link to="/register-partner" className="hover:text-brand transition">
                        Зареєструвати заклад
                    </Link>

                    {token ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 text-brand font-semibold hover:underline">
                                <User className="w-4 h-4" />
                                <span>{user?.firstName || 'Мій кабінет'}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                title="Вийти"
                                className="text-gray-400 hover:text-red-600 transition"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/register" className="hover:text-brand transition">
                                Зареєструватися
                            </Link>
                            <Link to="/login" className="text-brand hover:underline font-semibold">
                                Вхід
                            </Link>
                        </>
                    )}

                    <button className="p-2 border rounded-xl hover:bg-gray-50 transition">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </header>
    );
}
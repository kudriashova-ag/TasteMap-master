import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, MessageSquare, Trash2, Clock, LogOut } from 'lucide-react';
import api from '../api/axios';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('bookings');
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let storedUser = null;
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser && rawUser !== 'undefined') {
                storedUser = JSON.parse(rawUser);
            }
        } catch (e) {
            console.error('Помилка парсингу користувача:', e);
        }

        if (!storedUser) {
            navigate('/login');
            return;
        }

        setUser(storedUser);
        fetchUserData();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Загружаем бронирования
            try {
                const resBookings = await api.get('/Booking/my-bookings');
                setBookings(resBookings.data || []);
            } catch (err) {
                console.error('Помилка завантаження бронювань:', err);
            }

            // Загружаем отзывы (если эндпоинт отсутствует, профиль не сбоит)
            try {
                const resReviews = await api.get('/Review/my-reviews');
                setReviews(resReviews.data || []);
            } catch (err) {
                console.warn('Эндпоинт /Review/my-reviews ще не реалізовано на бекенді.');
                setReviews([]);
            }

        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Ви дійсно хочете скасувати це бронювання?')) return;

        try {
            await api.delete(`/Booking/${bookingId}`);
            alert('Бронювання скасовано.');
            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        } catch (err) {
            alert(
                err.response?.data?.message || 'Не вдалося скасувати бронювання.'
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 mb-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md">
                        {user.firstName?.[0] || 'U'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs rounded-xl transition"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Вийти з акаунта</span>
                </button>
            </div>

            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-2">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center gap-2 pb-2 text-sm font-semibold transition ${activeTab === 'bookings'
                            ? 'text-brand border-b-2 border-brand'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                >
                    <Calendar className="w-4 h-4" />
                    <span>Мої бронювання ({bookings.length})</span>
                </button>

                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex items-center gap-2 pb-2 text-sm font-semibold transition ${activeTab === 'reviews'
                            ? 'text-brand border-b-2 border-brand'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>Мої відгуки ({reviews.length})</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand border-t-transparent"></div>
                    <p className="mt-3 text-xs text-gray-500">Завантаження...</p>
                </div>
            ) : activeTab === 'bookings' ? (
                <div>
                    {bookings.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
                            <p className="text-sm text-gray-500 mb-4">
                                У вас поки немає активних бронювань
                            </p>
                            <Link
                                to="/"
                                className="px-6 py-2.5 bg-brand text-white font-semibold rounded-xl text-xs hover:bg-brand-hover transition"
                            >
                                Знайти ресторан
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-gray-900 text-base">
                                                {b.restaurantName || 'Ресторан'}
                                            </h3>
                                            <span className="text-xs px-2.5 py-1 bg-orange-50 text-brand rounded-full font-semibold">
                                                {b.numberOfGuests} чол.
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            <span>
                                                {new Date(b.bookingTime).toLocaleString('uk-UA')}
                                            </span>
                                        </p>

                                        {b.specialRequests && (
                                            <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl mb-4">
                                                <strong>Побажання:</strong> {b.specialRequests}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleCancelBooking(b.id)}
                                        className="flex items-center justify-center gap-1.5 w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition mt-2"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Скасувати бронювання</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
                            <p className="text-sm text-gray-500">
                                Ви ще не залишали відгуків
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((r) => (
                                <div
                                    key={r.id}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-sm text-gray-900">
                                            {r.restaurantName || 'Ресторан'}
                                        </h4>
                                        <span className="text-xs font-bold text-amber-500">
                                            ★ {r.rating} / 5
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600">{r.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
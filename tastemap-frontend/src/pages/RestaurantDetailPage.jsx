import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Clock, MessageSquare } from 'lucide-react';
import api from '../api/axios';

export default function RestaurantDetailPage() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Поля формы бронирования
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('18:00');
    const [guests, setGuests] = useState(2);
    const [specialRequests, setSpecialRequests] = useState('');
    const [bookingStatus, setBookingStatus] = useState(null);

    // Поля формы отзыва
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewStatus, setReviewStatus] = useState(null);

    useEffect(() => {
        fetchRestaurantAndReviews();
    }, [id]);

    const fetchRestaurantAndReviews = async () => {
        try {
            setLoading(true);
            const resRestaurant = await api.get(`/Restaurant/${id}`);
            setRestaurant(resRestaurant.data);

            const resReviews = await api.get(`/Review/restaurant/${id}`);
            setReviews(resReviews.data);
        } catch (err) {
            console.error('Помилка завантаження даних ресторана:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setBookingStatus(null);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Будь ласка, увійдіть в акаунт, щоб забронювати столик.');
            return;
        }

        try {
            const fullDateTime = `${bookingDate}T${bookingTime}:00Z`;
            await api.post('/Booking/create', {
                restaurantId: parseInt(id),
                bookingTime: fullDateTime,
                numberOfGuests: parseInt(guests),
                specialRequests: specialRequests
            });

            setBookingStatus({ type: 'success', message: 'Столик успішно заброньовано!' });
            setSpecialRequests('');
        } catch (err) {
            setBookingStatus({
                type: 'error',
                message: err.response?.data?.message || 'Помилка при бронюванні.'
            });
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        setReviewStatus(null);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Будь ласка, увійдіть в акаунт, щоб залишити відгук.');
            return;
        }

        try {
            await api.post('/Review/add', {
                restaurantId: parseInt(id),
                rating: parseInt(rating),
                comment: comment
            });

            setReviewStatus({ type: 'success', message: 'Відгук додано!' });
            setComment('');
            fetchRestaurantAndReviews(); // Обновляем список отзывов
        } catch (err) {
            setReviewStatus({
                type: 'error',
                message: err.response?.data?.message || 'Помилка при додаванні відгуку.'
            });
        }
    };

    if (loading) {
        return (
            <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-brand border-t-transparent"></div>
                <p className="mt-4 text-gray-500 text-sm">Завантаження інформації про ресторан...</p>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-bold text-gray-800">Ресторан не знайдено</h2>
                <Link to="/" className="mt-4 inline-block text-brand hover:underline">Повернутися на головну</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Хлебные крошки */}
            <div className="text-xs text-gray-400 mb-6">
                <Link to="/" className="hover:underline">Головна</Link> &gt; <span className="text-gray-600">{restaurant.name}</span>
            </div>

            {/* Галерея / Обложка */}
            <div className="relative h-80 rounded-3xl overflow-hidden mb-8 shadow-sm">
                <img
                    src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
                    <div className="text-white">
                        <span className="bg-brand text-xs px-3 py-1 rounded-full font-semibold mb-2 inline-block">
                            {restaurant.cuisineType || "Ресторан"}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{restaurant.name}</h1>
                        <p className="flex items-center gap-1 text-sm text-gray-200">
                            <MapPin className="w-4 h-4 text-brand" />
                            <span>{restaurant.address || restaurant.city}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левый блок: Описание и Отзывы */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Описание */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Про заклад</h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {restaurant.description || "Чудовий заклад із затишною атмосферою, уважним персоналом та вишуканою кухнею."}
                        </p>
                    </div>

                    {/* Секция Отзывов */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-brand" />
                            <span>Відгуки гостей ({reviews.length})</span>
                        </h2>

                        {/* Форма добавления отзыва */}
                        <form onSubmit={handleAddReview} className="mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">Залишити відгук</h3>

                            {reviewStatus && (
                                <div className={`p-3 rounded-xl text-xs mb-3 ${reviewStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                    {reviewStatus.message}
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-3">
                                <label className="text-xs font-medium text-gray-600">Оцінка:</label>
                                <select
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="px-3 py-1.5 border rounded-lg text-sm bg-white outline-none focus:border-brand"
                                >
                                    <option value="5">5 ★★★★★ (Відмінно)</option>
                                    <option value="4">4 ★★★★☆ (Добре)</option>
                                    <option value="3">3 ★★★☆☆ (Нормально)</option>
                                    <option value="2">2 ★★☆☆☆ (Погано)</option>
                                    <option value="1">1 ★☆☆☆☆ (Жахливо)</option>
                                </select>
                            </div>

                            <textarea
                                required
                                rows="3"
                                placeholder="Поділіться враженнями від закладу..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none text-sm bg-white focus:border-brand mb-3"
                            />

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-semibold rounded-xl transition"
                            >
                                Опублікувати відгук
                            </button>
                        </form>

                        {/* Список отзывов */}
                        <div className="space-y-4">
                            {reviews.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-4">Поки немає відгуків. Будьте першим!</p>
                            ) : (
                                reviews.map((r) => (
                                    <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-sm text-gray-800">{r.userName || "Гість"}</span>
                                            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                <span>{r.rating} / 5</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600">{r.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Правый блок: Форма бронирования столика */}
                <div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md sticky top-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                            Забронювати столик
                        </h2>

                        {bookingStatus && (
                            <div className={`p-3 rounded-xl text-xs mb-4 ${bookingStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-600'}`}>
                                {bookingStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-brand" /> Дата
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-brand" /> Час
                                </label>
                                <select
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm bg-white"
                                >
                                    {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-brand" /> Кількість гостей
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    required
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Особливі побажання</label>
                                <textarea
                                    rows="2"
                                    placeholder="Наприклад: столик біля вікна"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand outline-none text-xs"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition shadow-md text-sm"
                            >
                                Підтвердити бронь
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
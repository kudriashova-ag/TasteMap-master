import React, { useState, useEffect } from 'react';
import { Building2, Clock, Image, Wifi, Dog, Baby, ParkingCircle, Sun } from 'lucide-react';
import api from '../api/axios';

export default function OwnerDashboardPage() {
    const [restaurant, setRestaurant] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');
    const [message, setMessage] = useState(null);

    // Все 13 полей из вашей сущности
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        city: 'Київ',
        restaurantType: 'Европейская',
        imageUrl: '',
        totalTables: 10,
        maxGuestsCapacity: 40,
        hasKidsZone: false,
        isPetFriendly: false,
        hasWifi: true,
        hasParking: false,
        hasSummerTerrace: false
    });

    useEffect(() => {
        fetchOwnerData();
    }, []);

    const fetchOwnerData = async () => {
        try {
            setLoading(true);
            const resRest = await api.get('/Restaurant/my-restaurant');
            if (resRest.data) {
                setRestaurant(resRest.data);
                setFormData({
                    name: resRest.data.name || '',
                    description: resRest.data.description || '',
                    address: resRest.data.address || '',
                    city: resRest.data.city || 'Київ',
                    restaurantType: resRest.data.restaurantType || 'Европейская',
                    imageUrl: resRest.data.imageUrl || '',
                    totalTables: resRest.data.totalTables || 10,
                    maxGuestsCapacity: resRest.data.maxGuestsCapacity || 40,
                    hasKidsZone: resRest.data.hasKidsZone || false,
                    isPetFriendly: resRest.data.isPetFriendly || false,
                    hasWifi: resRest.data.hasWifi !== undefined ? resRest.data.hasWifi : true,
                    hasParking: resRest.data.hasParking || false,
                    hasSummerTerrace: resRest.data.hasSummerTerrace || false
                });

                const resBookings = await api.get(`/Booking/restaurant/${resRest.data.id}`);
                setBookings(resBookings.data || []);
            }
        } catch (err) {
            console.warn('Заведение не найдено или еще не создано:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }));
    };

    const handleSaveRestaurant = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            if (restaurant) {
                await api.put(`/Restaurant/${restaurant.id}`, formData);
                setMessage({ type: 'success', text: 'Дані закладу успішно оновлено!' });
            } else {
                const res = await api.post('/Restaurant/create', formData);
                setRestaurant(res.data);
                setMessage({ type: 'success', text: 'Заклад успішно створено!' });
            }
            fetchOwnerData();
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Помилка збереження даних.'
            });
        }
    };

    if (loading) {
        return (
            <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-brand border-t-transparent"></div>
                <p className="mt-4 text-gray-500 text-sm">Завантаження кабінету партнера...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-brand to-orange-500 rounded-3xl p-8 text-white mb-8 shadow-md flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Панель ресторатора</h1>
                    <p className="text-xs md:text-sm text-orange-100">
                        {restaurant ? `Управління закладом "${restaurant.name}"` : 'Створіть свій ресторан на Tastemap'}
                    </p>
                </div>
                <Building2 className="w-12 h-12 text-white/30" />
            </div>

            <div className="flex gap-4 mb-6 border-b pb-2">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`pb-2 text-sm font-semibold transition ${activeTab === 'bookings' ? 'text-brand border-b-2 border-brand' : 'text-gray-500'
                        }`}
                >
                    Вхідні бронювання ({bookings.length})
                </button>
                <button
                    onClick={() => setActiveTab('edit-restaurant')}
                    className={`pb-2 text-sm font-semibold transition ${activeTab === 'edit-restaurant' ? 'text-brand border-b-2 border-brand' : 'text-gray-500'
                        }`}
                >
                    {restaurant ? 'Налаштування закладу' : 'Додати заклад'}
                </button>
            </div>

            {activeTab === 'edit-restaurant' || !restaurant ? (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm max-w-3xl">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">
                        {restaurant ? 'Редагувати дані закладу' : 'Реєстрація нового закладу'}
                    </h2>

                    {message && (
                        <div className={`p-3 rounded-xl text-xs mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSaveRestaurant} className="space-y-5">
                        {/* Основная информация */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Назва закладу</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Тип закладу / Кухня</label>
                                <input
                                    type="text"
                                    name="restaurantType"
                                    required
                                    placeholder="наприклад, Італійська, Суші-бар"
                                    value={formData.restaurantType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Місто</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Точна адреса</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>
                        </div>

                        {/* Картинка */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Ссылка на фото (Image URL)</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="url"
                                    name="imageUrl"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>
                            {formData.imageUrl && (
                                <div className="mt-2 relative h-32 rounded-xl overflow-hidden border">
                                    <img src={formData.imageUrl} alt="Превью" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Вместимость и Столы */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Всього столиків</label>
                                <input
                                    type="number"
                                    name="totalTables"
                                    min="1"
                                    value={formData.totalTables}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Макс. кількість гостей</label>
                                <input
                                    type="number"
                                    name="maxGuestsCapacity"
                                    min="1"
                                    value={formData.maxGuestsCapacity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-brand"
                                />
                            </div>
                        </div>

                        {/* Переключатели удобств (Boolean атрибуты) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-3">Зручності та сервіси</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <label className="flex items-center gap-2 text-xs p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        name="hasWifi"
                                        checked={formData.hasWifi}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-brand rounded"
                                    />
                                    <Wifi className="w-4 h-4 text-gray-500" />
                                    <span>Wi-Fi</span>
                                </label>

                                <label className="flex items-center gap-2 text-xs p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        name="isPetFriendly"
                                        checked={formData.isPetFriendly}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-brand rounded"
                                    />
                                    <Dog className="w-4 h-4 text-gray-500" />
                                    <span>Pet Friendly</span>
                                </label>

                                <label className="flex items-center gap-2 text-xs p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        name="hasKidsZone"
                                        checked={formData.hasKidsZone}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-brand rounded"
                                    />
                                    <Baby className="w-4 h-4 text-gray-500" />
                                    <span>Дитяча зона</span>
                                </label>

                                <label className="flex items-center gap-2 text-xs p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        name="hasParking"
                                        checked={formData.hasParking}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-brand rounded"
                                    />
                                    <ParkingCircle className="w-4 h-4 text-gray-500" />
                                    <span>Парковка</span>
                                </label>

                                <label className="flex items-center gap-2 text-xs p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        name="hasSummerTerrace"
                                        checked={formData.hasSummerTerrace}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-brand rounded"
                                    />
                                    <Sun className="w-4 h-4 text-gray-500" />
                                    <span>Літня тераса</span>
                                </label>
                            </div>
                        </div>

                        {/* Описание */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Опис закладу</label>
                            <textarea
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none text-xs focus:border-brand"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl text-sm transition shadow-md"
                        >
                            Зберегти заклад
                        </button>
                    </form>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
                            <p className="text-sm text-gray-500">У вашого закладу поки немає нових бронювань</p>
                        </div>
                    ) : (
                        bookings.map((b) => (
                            <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-gray-900 text-sm">{b.userName || 'Гість'}</span>
                                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-brand rounded-full font-semibold">
                                            {b.numberOfGuests} місця
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{new Date(b.bookingTime).toLocaleString('uk-UA')}</span>
                                    </p>
                                    {b.specialRequests && (
                                        <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg">
                                            {b.specialRequests}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
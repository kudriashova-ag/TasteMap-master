import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Calendar, Star, Heart } from 'lucide-react';
import api from '../api/axios';

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');

    // Загружаем список ресторанов с нашего .NET API
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const response = await api.get('/Restaurant'); // GET /api/Restaurant
            setRestaurants(response.data);
        } catch (err) {
            console.error('Помилка завантаження ресторанів:', err);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация на клиенте
    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.city?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCuisine = selectedCuisine ? r.cuisineType === selectedCuisine : true;
        return matchesSearch && matchesCuisine;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Hero Section / Блок поиска */}
            <div className="bg-gradient-to-r from-orange-500 to-brand text-white py-12 px-4 shadow-inner">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
                        Знайдіть і забронюйте найкращий столик
                    </h1>
                    <p className="text-orange-100 mb-8 text-sm md:text-base">
                        Відкривайте для себе популярні ресторани, кафе та бари у вашому місті
                    </p>

                    {/* Панель поиска */}
                    <div className="bg-white p-3 rounded-2xl shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 text-gray-800">
                        <div className="flex items-center gap-2 px-3 py-2 border-r md:border-r border-gray-200">
                            <MapPin className="w-5 h-5 text-brand shrink-0" />
                            <input
                                type="text"
                                placeholder="Місто або ресторан..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 border-r md:border-r border-gray-200">
                            <Calendar className="w-5 h-5 text-brand shrink-0" />
                            <input
                                type="date"
                                className="w-full bg-transparent outline-none text-sm text-gray-600"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2">
                            <Users className="w-5 h-5 text-brand shrink-0" />
                            <select className="w-full bg-transparent outline-none text-sm text-gray-600">
                                <option value="2">2 персони</option>
                                <option value="3">3 персони</option>
                                <option value="4">4+ персони</option>
                            </select>
                        </div>

                        <button
                            onClick={fetchRestaurants}
                            className="bg-brand hover:bg-brand-hover text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
                        >
                            <Search className="w-5 h-5" />
                            <span>Шукати</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Фильтры и Категории */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
                    <button
                        onClick={() => setSelectedCuisine('')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition shrink-0 ${selectedCuisine === ''
                                ? 'bg-brand text-white shadow-sm'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        Усі заклади
                    </button>
                    {['Українська', 'Італійська', 'Японська', 'Європейська', 'Азіатська'].map((cuisine) => (
                        <button
                            key={cuisine}
                            onClick={() => setSelectedCuisine(cuisine)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition shrink-0 ${selectedCuisine === cuisine
                                    ? 'bg-brand text-white shadow-sm'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>

            {/* Список ресторанов */}
            <div className="max-w-6xl mx-auto px-4 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Результати пошуку ({filteredRestaurants.length})
                </h2>

                {loading ? (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-brand border-t-transparent"></div>
                        <p className="mt-4 text-gray-500 text-sm">Завантаження закладів...</p>
                    </div>
                ) : filteredRestaurants.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                        <p className="text-gray-500 font-medium">Закладів не знайдено</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRestaurants.map((restaurant) => (
                            <div
                                key={restaurant.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col group"
                            >
                                {/* Картинка ресторана */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 transition">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                                        {restaurant.cuisineType || "Ресторан"}
                                    </span>
                                </div>

                                {/* Инфо о ресторане */}
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand transition">
                                                {restaurant.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                <span>{restaurant.rating || "4.8"}</span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{restaurant.address || restaurant.city}</span>
                                        </p>

                                        <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                                            {restaurant.description || "Чудовий заклад із затишною атмосферою та смачною кухнею."}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/restaurant/${restaurant.id}`}
                                        className="w-full py-2.5 bg-orange-50 hover:bg-brand hover:text-white text-brand font-semibold rounded-xl text-sm text-center transition block"
                                    >
                                        Забронювати столик
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
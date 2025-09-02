import { Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// 这三个组件现在仍是 .jsx，也可以先用；随后再迁到 .tsx
import Home from './Home';
import Detail from './Detail';
import Favorites from './Favorites';

function NotFound(){
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404 — Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
}

export default function App() {
  const STORAGE_KEY = 'fav-ids-v1';

  // 收藏列表：用 number[] 明确类型
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as number[];
    } catch {
      return [];
    }
  });

  // 持久化
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="container">
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/favorites">Favorites ({favorites.length})</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/item/:id" element={<Detail favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 从 .env 中读取 API 根地址（已在 .env.example 里提供）
const API_URL = import.meta.env.VITE_API_URL;

export default function Home({ favorites, toggleFavorite }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');     // 搜索关键词（受控）
  const [page, setPage] = useState(1); // 简单分页

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = new URL(`${API_URL}/character`);
    if (q) url.searchParams.set('name', q);
    if (page) url.searchParams.set('page', page);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setCharacters([]);
        setError(err.message);
        setLoading(false);
      });
  }, [q, page]);

  return (
    <div>
      <h1>Character List</h1>

      {/* 受控搜索框 */}
      <label htmlFor="search">Search by name:</label>
      <input
        id="search"
        value={q}
        onChange={(e) => {
          setPage(1);
          setQ(e.target.value);
        }}
        placeholder="e.g. Rick"
        style={{ width: '100%', maxWidth: 360, padding: '.5rem', margin: '.5rem 0' }}
      />

      {loading && <p role="status">Loading...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && characters.length === 0 && <p>No results.</p>}

      <ul>
        {characters.map((char) => {
          const isFav = favorites.includes(char.id);
          return (
            <li key={char.id} style={{ marginBottom: 6 }}>
              <Link to={`/item/${char.id}`}>
                {char.name} - {char.status}
              </Link>{' '}
              <button onClick={() => toggleFavorite(char.id)}>
                {isFav ? '★ Unfav' : '☆ Fav'}
              </button>
            </li>
          );
        })}
      </ul>

      {/* 简单翻页（API 每页 20 条） */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

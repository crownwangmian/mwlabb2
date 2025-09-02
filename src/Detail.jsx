import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://rickandmortyapi.com/api';

export default function Detail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/character/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return null;

  const isFav = favorites.includes(item.id);

  return (
    <article>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} style={{ maxWidth: 240, borderRadius: 12 }} />
      <p>Species: {item.species}</p>
      <p>Status: {item.status}</p>
      <p>Gender: {item.gender}</p>
      <p>Origin: {item.origin?.name}</p>
      <p>Location: {item.location?.name}</p>

      <button onClick={() => toggleFavorite(item.id)}>
        {isFav ? '★ Remove favorite' : '☆ Add favorite'}
      </button>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/">← Back to list</Link>
      </p>
    </article>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;

type FavoritesProps = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

type Character = {
  id: number;
  name: string;
};

export default function Favorites({ favorites, toggleFavorite }: FavoritesProps) {
  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setItems([]);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/character/${favorites.join(',')}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Character | Character[]>;
      })
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data];
        setItems(arr);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, [favorites]);

  if (favorites.length === 0) return <p>No favorites yet.</p>;
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 6 }}>
            <Link to={`/item/${it.id}`}>{it.name}</Link>{' '}
            <button onClick={() => toggleFavorite(it.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

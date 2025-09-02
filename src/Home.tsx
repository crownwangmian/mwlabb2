import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;

type HomeProps = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

type Character = {
  id: number;
  name: string;
  status: string;
};

export default function Home({ favorites, toggleFavorite }: HomeProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = new URL(`${API_URL}/character`);
    if (q) url.searchParams.set('name', q);
    if (page) url.searchParams.set('page', String(page));

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ results?: Character[] }>;
      })
      .then((data) => {
        setCharacters(data.results ?? []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setCharacters([]);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, [q, page]);

  return (
    <div>
      <h1>Character List</h1>

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

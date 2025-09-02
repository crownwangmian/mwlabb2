import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Favorites from '../Favorites'

describe('Favorites', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows empty message when no favorites', () => {
    render(
      <MemoryRouter>
        <Favorites favorites={[]} toggleFavorite={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByText(/No favorites yet/i)).toBeInTheDocument()
  })

  it('renders favorite items when ids exist', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
    } as unknown as Response)

    render(
      <MemoryRouter>
        <Favorites favorites={[1, 2]} toggleFavorite={() => {}} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.getByText('Morty Smith')).toBeInTheDocument()
    })
  })
})

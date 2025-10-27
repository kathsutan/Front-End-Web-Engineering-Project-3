import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Sort from './components/Sort.jsx'
import Movies from './components/Movies.jsx'
import Footer from './components/Footer.jsx'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export default function App() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('')

  const pageLabel = useMemo(() => `Page ${page} of ${totalPages}`, [page, totalPages])

  useEffect(() => {
    let url = ''
    if (query) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sort}`
    }

    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })
        const data = await res.json()
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Fetch error:', err)
      }
    })()

    return () => controller.abort()
  }, [API_KEY, page, query, sort])

  const handleSearch = (text) => {
    setQuery(text.trim())
    setPage(1)
  }

  const handleSort = (value) => {
    setSort(value)
    setPage(1)
  }

  return (
    <>
      <Header />
      <Sort onSearch={handleSearch} onSort={handleSort} currentSort={sort} />
      <main>
        <Movies movies={movies} imageBase={IMAGE_URL} />
      </main>
      <Footer
        pageLabel={pageLabel}
        canPrev={page > 1}
        canNext={page < totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </>
  )
}
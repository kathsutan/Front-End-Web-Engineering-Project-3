import { useEffect, useState } from 'react'

export default function Sort({ onSearch, onSort, currentSort }) {
  const [input, setInput] = useState('')

  // Debounce search calls so we don't hammer the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => onSearch(input), 300)
    return () => clearTimeout(t)
  }, [input])

  return (
    <div className="sort-options">
      <input
        className="gap"
        type="text"
        placeholder="Search for a movie..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select value={currentSort} onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="release_date.asc">Release Date (Asc)</option>
        <option value="release_date.desc">Release Date (Desc)</option>
        <option value="vote_average.asc">Rating (Asc)</option>
        <option value="vote_average.desc">Rating (Desc)</option>
        <option value="popularity.desc">Popularity (Desc)</option>
      </select>
    </div>
  )
}

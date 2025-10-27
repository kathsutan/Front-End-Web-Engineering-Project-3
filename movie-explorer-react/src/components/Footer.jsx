export default function Footer({ pageLabel, canPrev, canNext, onPrev, onNext }) {
  return (
    <footer>
      <button onClick={onPrev} disabled={!canPrev}>Previous</button>
      <span id="pageNumber">{pageLabel}</span>
      <button onClick={onNext} disabled={!canNext}>Next</button>
    </footer>
  )
}
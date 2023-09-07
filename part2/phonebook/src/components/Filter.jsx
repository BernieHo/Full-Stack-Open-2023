function Filter({ searchInput, handleFilterInputChange }) {
  return (
    <form>
      <div>
        filter shown with{' '}
        <input value={searchInput} onChange={handleFilterInputChange} />
      </div>
    </form>
  )
}

export default Filter

function FormNewPerson({
  handleSubmit,
  handleNameInputChange,
  handleNumberInputChange,
  newName,
  newNumber
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default FormNewPerson

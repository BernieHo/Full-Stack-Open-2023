import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return null
    }
    if (!newName || !newNumber) {
      alert('Please fill out name and number!')
      return null
    }
    const updatedPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })
    setPersons(updatedPersons)
    setShownPersons(filterPersons(updatedPersons, searchInput))
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = (personList, searchString) => {
    if (!searchString) {
      return personList
    } else {
      return personList.filter((p) => p.name.toUpperCase().includes(searchString.toUpperCase()))
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterInputChange = (event) => {
    setSearchInput(event.target.value)
    setShownPersons(filterPersons(persons, event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={searchInput} onChange={handleFilterInputChange} />
        </div>
      </form>
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
      <h2>Numbers</h2>
      {shownPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        )
      })}
    </div>
  )
}

export default App

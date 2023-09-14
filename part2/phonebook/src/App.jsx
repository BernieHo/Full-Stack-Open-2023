import Person from './components/Person.jsx'
import FormNewPerson from './components/FormNewPerson'
import Filter from './components/Filter'
import { useEffect, useState } from 'react'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

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
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const removePerson = person => {
    if (confirm(`Delete ${person.name}`)) {
      personService.remove(person.id).then(statusText => {
        if (statusText === 'OK') {
          setPersons(persons.filter(p => p !== person))
        }
      })
    }
  }

  const shownPersons = searchInput
    ? persons.filter(p => p.name.toUpperCase().includes(searchInput.toUpperCase()))
    : persons

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchInput={searchInput}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h3>Add a new</h3>
      <FormNewPerson
        handleSubmit={handleSubmit}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <div>
        {shownPersons.map(person => (
          <Person
            key={person.id}
            person={person}
            remove={() => removePerson(person)}
          />
        ))}
      </div>
    </div>
  )
}

export default App

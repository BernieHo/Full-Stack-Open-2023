import Persons from './components/Persons'
import FormNewPerson from './components/FormNewPerson'
import Filter from './components/Filter'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
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
    axios.post('http://localhost:3001/persons', newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
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
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App

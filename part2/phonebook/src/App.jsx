import Person from './components/Person.jsx'
import FormNewPerson from './components/FormNewPerson'
import Filter from './components/Filter'
import Notification from './components/Notification.jsx'
import { useEffect, useState } from 'react'
import personService from './services/persons.js'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('info') // info / error

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (!newName || !newNumber) {
      alert('Please fill out name and number!')
      return null
    }
    if (existingPerson) {
      if (confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setNotificationMessage(`Changed number of ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3500)
        })
        .catch(() => {
            setNotificationType('error')
            setNotificationMessage(`Information of ${existingPerson.name} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3500)
          }
        )
      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationType('info')
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3500)
      })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4500)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = person => {
    if (confirm(`Delete ${person.name}`)) {
      personService.remove(person.id).then(statusCode => {
        if (statusCode === 204) {
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
      {notificationMessage ? <Notification message={notificationMessage} type={notificationType} /> : null}
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

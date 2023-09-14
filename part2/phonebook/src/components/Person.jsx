const Person = ({ person, remove }) => {
  return (
    <div>
      <label>
        {person.name} {person.number} {' '}
      </label>
      <button onClick={remove}>delete</button>
    </div>
  )
}

export default Person

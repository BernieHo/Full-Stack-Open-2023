import { Content } from './Content'
import { Header } from './Header'
import { Total } from './Total'

const Course = ({ coursename, courses }) => {
  return (
    <div>
      <h1>{coursename}</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}

export default Course

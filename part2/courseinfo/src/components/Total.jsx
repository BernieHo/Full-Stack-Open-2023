export const Total = ({ parts }) => {
  return <h4>total of {parts.reduce((a, part) => a + part.exercises, 0)} exercises</h4>
}

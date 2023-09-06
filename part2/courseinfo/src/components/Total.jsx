export const Total = ({ parts }) => {
  return <h4>total of {parts.reduce((a, { exercises }) => a + exercises, 0)} exercises</h4>
}

function Notification({message, type}) {
  let className= 'Notification'

  if (type === 'error') {
    className += ' Error'
  }
  if (message === null){
    return null
  }
  return (
    <div className={className}>{message}</div>
  )
}

export default Notification

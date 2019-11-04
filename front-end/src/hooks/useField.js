import { useState } from 'react'

const useField = (type, pattern) => {
  const [ value, setValue ] = useState('')

  const onChange = e => {
    if (pattern && pattern.test(e.target.value))
      return 

    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [{
    value,
    type,
    onChange
  }, reset]
}

export default useField
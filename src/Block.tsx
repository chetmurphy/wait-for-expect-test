import * as React from 'react'

export function Block() {

  const [count, setCount] = React.useState(0)

  return {
    count,
    setCount
  }
}
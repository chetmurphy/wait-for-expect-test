import * as React from 'react'
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

import { Block} from '../Block'

/**
 * Fails with and without mock
 * Runs with mock and wait for expect has section commented out
 */
// Need to mock Date for react-hooks-testing-library
declare global {
  interface Window { Date: any; }
}
window.Date = Date;

function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

describe('custom hook tests', () => {
  afterEach(cleanup)

  test('should return window.innerHeight', () => {
    const size = renderHook(() => useWindowSize())
    
    expect(size.result.current.height).toEqual(768)
  })

  test('Block #1', () => {
    
    const test = renderHook(() => Block())

    expect(test.result.current.count).toEqual(0)

    act(() => {test.result.current.setCount(1) })
   
    expect(test.result.current.count).toEqual(1)

  })

})
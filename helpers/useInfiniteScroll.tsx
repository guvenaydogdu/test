import { useEffect, useState, useRef } from 'react'

export const useInfiniteScroll = (loadMoreFunc: () => void) => {
  const [element, setLastElement] = useState(null)
  const loader = useRef(loadMoreFunc)
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          loader.current()
        }
      },
      { threshold: 1 }
    )
  )

  useEffect(() => {
    loader.current = loadMoreFunc
  }, [loadMoreFunc])
  useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        console.log('test')
        //currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  return { setLastElement }
}

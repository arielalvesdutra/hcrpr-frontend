import { useEffect } from 'react'

const usePageTitle = (pageTitle: string) => {
  
  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle]) 
}

export { usePageTitle }

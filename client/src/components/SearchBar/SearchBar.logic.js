import { useState, useEffect, useRef } from 'react'
import { useProductsStore } from '../../store/productsStore'

export const useSearch = (hide) => {
  const setProductsByName = useProductsStore((state) => state.setProductsByName)
  const fetchProducts = useProductsStore((state) => state.fetchProducts)
  const inputRef = useRef()
  const searchBarRef = useRef()

  const [name, setName] = useState('')

  const handleSearch = async (name) => {
    try {
      if (name === '') {
        await fetchProducts()
      } else {
        await setProductsByName(name)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        hide()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return async () => {
      setName('')
      await fetchProducts()
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    handleSearch(name)
  }, [name])

  return { name, setName, inputRef, searchBarRef, handleSearch }
}

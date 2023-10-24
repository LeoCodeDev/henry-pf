import { useState, useEffect } from 'react'

export const useLogicPagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pagedItems, setPagedItems] = useState([])

  useEffect(() => {
    setPagedItems(
      items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    )
  }, [items, currentPage, itemsPerPage])

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    pagedItems,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
    setCurrentPage
  }
}

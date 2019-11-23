import React, { Component } from 'react'
import PaginationHelper from "react-js-pagination";

import './Pagination.scss'

interface IPaginationProps {
  currentPage?: number
  items: any
  itemsPerPage: number
  totalItems: number
  searchItemsCallback: any
  totalPages: number
  setItemsCurrentPage: any
}

class Pagination extends Component<IPaginationProps> {

  changePage = (selectedPage: number) =>  {
    this.forceUpdate()

    this.setState({
      currentPage: selectedPage
    })
    this.props.setItemsCurrentPage(selectedPage)    
    this.props.searchItemsCallback({page: selectedPage})
  }

  render() {
    const { items, itemsPerPage, totalItems, currentPage } = this.props    

    return (
      <section className="pagination__section">
          {items.length > 0 && (
          <PaginationHelper
            activePage={currentPage ? currentPage : 1}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={4}
            onChange={this.changePage}
          />
        )}
      </section>
    )
  }
}

export default Pagination

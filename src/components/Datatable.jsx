import React from 'react'
import './Datatable.css'

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table'

import GlobalFilter from './GlobalFilter'

const Datatable = (props) => {
  const { data, columns, tableBaslik } = props

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,

    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['score'],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const { pageIndex } = state

  console.log('headerGroups', headerGroups)
  //   console.log('footerGroups', footerGroups)

  return (
    <>
      <div className="row">
        <div className="col-md-12 p-3  ">
          <div className="card">
            <div className="card-header">
              <h5>
                <i className="fa fa-user" aria-hidden="true"></i> {tableBaslik}
              </h5>
            </div>
            <div className="card-body">
              <div className="globalFilterMainDiv">
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
              <div className="table-responsive">
                <table
                  {...getTableProps()} // Tablo proplarını buradan alıyoruz.
                  className="table  table-striped table-hover"
                >
                  <thead>
                    {headerGroups.map((
                      headerGroup, // Tablo başlıklarını buradan alıyoruz.
                    ) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps, // sort edebilmek için
                            )}
                          >
                            {column.render('Header')}
                            <span>
                              {column.isSortedDesc ? ( // aşağı ve yukarı yönlü okları gösteriyoruz.
                                <i
                                  className=" fa fa-sort"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  className=" fa fa-sort"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    {footerGroups.map((group) => (
                      <tr {...group.getFooterGroupProps()}>
                        {group.headers.map((column) => (
                          <th {...column.getFooterProps()}>
                            {column.render('Footer')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="dataTable-pagination d-flex justify-content-end">
            <span className="pageOptionsSpan">
              {' '}
              {pageIndex + 1} / {pageOptions.length}{' '}
            </span>
            <button
              className="btn btn-primary btn-sm mr-2"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Datatable

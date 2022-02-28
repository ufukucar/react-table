import React from 'react'
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length

  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className="mb-3 row">
      <label htmlFor="globalFilterInput" className="col-sm-1 col-form-label">
        Ara:
      </label>

      <div className="col-sm-11">
        <input
          className="form-control"
          id="globalFilterInput"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value)
            setGlobalFilter(e.target.value || undefined)
          }}
          placeholder={`${count} kayıt içinde arama yap...`}
        />
      </div>
    </div>
  )
}

export default GlobalFilter

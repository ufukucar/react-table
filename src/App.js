import './App.css'
import React from 'react'
import Datatable from './components/Datatable'

import datalar from './data.json'

function App() {
  const data = React.useMemo(() => {
    return datalar
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ad Soyad',
        Footer: 'Ad Soyad',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Profil İsmi',
        Footer: 'Profil İsmi',
        accessor: 'profil_name',
      },
      {
        Header: 'Tarih',
        Footer: 'Tarih',
        accessor: 'date',
      },
      {
        Header: 'score',
        Footer: 'score',
        accessor: 'score',
      },
      {
        Header: 'Adres',
        Footer: 'Adres',
        accessor: 'location',
      },
      {
        Header: 'Düzenle',
        accessor: (originalRow, rowIndex) => (
          <div className="d-flex  align-items-center">
            <button
              className="btn btn-warning mr-2  btn-sm"
              onClick={() => handleEdit(originalRow)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(originalRow)}
            >
              Delete
            </button>
          </div>
        ),
        id: 'action',
        Footer: 'Düzenle',
      },
    ],
    [],
  )

  const handleEdit = (row) => {
    alert('EDIT: ' + JSON.stringify(row))
    console.log(row)
  }

  const handleDelete = (row) => {
    alert('DELETE: ' + JSON.stringify(row))
    console.log(row)
  }

  return (
    <div className="container-fluid">
      <Datatable data={data} columns={columns} tableBaslik="Personeller" />
    </div>
  )
}

export default App

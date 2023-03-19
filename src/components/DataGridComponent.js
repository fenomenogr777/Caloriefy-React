import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function DataGridComponent() {
   const columns = [
      { field: 'col1', headerName: 'Calories', width: 100 },
      { field: 'col2', headerName: 'Protein', width: 100 },
      { field: 'col3', headerName: 'Carb', width: 100 },
      { field: 'col4', headerName: 'Fat', width: 100 },
   ]

   const rows = [
      { id: 0, col1: '2500/2700', col2: 'World', col3: '35', col4: "45/80" },
      { id: 1, col1: 'Hello', col2: 'World' },
      { id: 2, col1: 'DataGridPro', col2: 'is Awesome nowandtre' },
   ]

   return (
      <div style={{ height: 300, width: '100%' }}>
         <DataGrid
            autoPageSize
            density='compact'
            rows={rows}
            columns={columns}
         />
      </div>
   )
}

export default DataGridComponent

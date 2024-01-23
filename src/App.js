import react, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const columns = [
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();
        console.log(params.row);
      };

      return (
        <>
          <Button onClick={onClick} color="primary">
            Ação 1
          </Button>
          <Button onClick={onClick} color="secondary">
            Ação 2
          </Button>
        </>
      );
    },
  },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function App() {

  const [rowsData, setRowsData] = useState(rows)
  const [filterName, setFilterName] = useState("")

  useEffect(() => {
    let filteredRowData

    if (filterName !== "") {
      filteredRowData = rowsData.filter(data => data.name.toLowerCase().includes(filterName.toLowerCase()))
    } else {
      filteredRowData = rows
    }

    setRowsData(filteredRowData)
  }, [filterName])


  return (
    <Grid container gap={6} sx={{ padding: { xs: 0, md: 4 } }}>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2} padding={2}>
          <Grid item md={4} sx={12} style={{ maxWidth: '400px' }}>
            <TextField label="Nome" fullWidth
              onChange={(e) => setFilterName(e.target.value)}
            />
          </Grid>
          <Grid item md={4} sx={12} style={{ maxWidth: '400px' }}>
            <TextField label="Calorias" fullWidth type='number' />
          </Grid>
        </Grid>
      </Grid>

      <DataGrid
        sx={{
          paddingInline: "12px"
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Grid>
  );
}
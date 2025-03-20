import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130, editable: true },
  { field: "lastName", headerName: "Last Name", width: 130, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    editable: true
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 180,
    sortable: false,
    valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`
  },
  { field: "email", headerName: "Email", width: 200, editable: true },
  { field: "phone", headerName: "Phone", width: 150, editable: true },
  { field: "address", headerName: "Address", width: 250, editable: true }
];

const rows = [
  {
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    email: "jon.snow@mail.com",
    phone: "123-456-7890",
    address: "Winterfell"
  },
  {
    id: 2,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    email: "cersei@mail.com",
    phone: "234-567-8901",
    address: "King's Landing"
  },
  {
    id: 3,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 31,
    email: "jaime@mail.com",
    phone: "345-678-9012",
    address: "Casterly Rock"
  },
  {
    id: 4,
    firstName: "Arya",
    lastName: "Stark",
    age: 11,
    email: "arya@mail.com",
    phone: "456-789-0123",
    address: "Winterfell"
  },
  {
    id: 5,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    email: "daenerys@mail.com",
    phone: "567-890-1234",
    address: "Dragonstone"
  },
  {
    id: 6,
    firstName: null,
    lastName: "Melisandre",
    age: 150,
    email: "melisandre@mail.com",
    phone: "678-901-2345",
    address: "Unknown"
  },
  {
    id: 7,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    email: "ferrara@mail.com",
    phone: "789-012-3456",
    address: "Essos"
  },
  {
    id: 8,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    email: "rossini@mail.com",
    phone: "890-123-4567",
    address: "Westeros"
  },
  {
    id: 9,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    email: "harvey@mail.com",
    phone: "901-234-5678",
    address: "Stormlands"
  }
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f4f4f4" },
          "@media (max-width: 600px)": {
            ".MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
              fontSize: "12px", // Smaller text on small screens
              minWidth: 100 // Ensure columns are visible
            }
          }
        }}
      />
    </Box>
  );
}
